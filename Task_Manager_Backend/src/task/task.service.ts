import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPayload } from '../user/interfaces/user.payload';
import { UserRole } from '../user/entities/user.role';
import { SearchTaskDto } from './dto/search-task.dto';
import { TaskGateway } from './task.gateway';
import { BoardService } from '../board/board.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(forwardRef(() => BoardService))
    private readonly boardService: BoardService,
    private readonly taskGateway: TaskGateway,
  ) {}

  async redisSetValue(boardId: number, tasks: Task[]) {
    await this.cacheManager.set(`board:${boardId}`, tasks, 100);

    return;
  }
  async redisGetValue(boardId: number): Promise<Task[] | undefined> {
    const tasks = await this.cacheManager.get<Task[]>(`board:${boardId}`);
    return tasks;
  }
  async cacheInvalidate(boardId: number) {
    await this.cacheManager.del(`board:${boardId}`);

    return;
  }

  async create(createTaskDto: CreateTaskDto, user: UserPayload) {
    if (!createTaskDto.userId) {
      createTaskDto.userId = user.sub;
    }
    const board = await this.boardService.findOne(
      createTaskDto.boardId,
      createTaskDto.userId,
    );

    if (!board) {
      throw new NotFoundException('Invalid Board');
    }

    const isMember = board.users?.some((u) => u.id === createTaskDto.userId);
    if (!isMember) {
      throw new ForbiddenException('User not subscribed to the board');
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      board: { id: createTaskDto.boardId },
      user: { id: createTaskDto.userId },
    });
    const savedTask = await this.taskRepository.save(task);
    await this.cacheInvalidate(createTaskDto.boardId);
    this.taskGateway.emitTaskCreated(savedTask);
    return savedTask;
  }

  async findAll(user: UserPayload, searchTaskDto: SearchTaskDto) {
    const {
      boardId,
      search,
      status,
      toSortBy,
      page,
      pageSize = 8,
    } = searchTaskDto;

    const redisTasks = await this.redisGetValue(boardId);

    if (redisTasks && !search && !status && !toSortBy && !page) {
      const total = redisTasks.length;
      return { tasks: redisTasks, total };
    }

    const query = this.taskRepository.createQueryBuilder('task');

    const offset = (page - 1) * pageSize;

    query.where('task.boardId = :boardId', { boardId });

    if (search) {
      query.andWhere('task.title ILIKE :title', { title: `%${search}%` });
    }

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (toSortBy) {
      query.orderBy(`task.${toSortBy as string}`, 'ASC');
    }

    if (page !== undefined) {
      const [tasks, total] = await query
        .skip(offset)
        .take(pageSize)
        .getManyAndCount();

      return { tasks, total };
    } else {
      const [tasks, total] = await query.getManyAndCount();
      await this.redisSetValue(boardId, tasks);
      return { tasks, total };
    }
  }

  async findOne(id: number): Promise<Omit<Task, 'user'>> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['board', 'user'],
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(user: UserPayload, id: number, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user', 'board'],
    });

    if (!task) throw new NotFoundException(`Task with id ${id} not found`);

    const hasAccess = task.user.boards?.some(
      (board) => board.id === task.board.id,
    );
    if (hasAccess) {
      throw new ForbiddenException('User is not part of this board');
    }

    if (updateTaskDto.dueDate) {
      const newDueDate = new Date(updateTaskDto.dueDate);
      const oldDueDate = task.dueDate;
      const now = new Date();

      if (newDueDate < oldDueDate && newDueDate < now) {
        throw new BadRequestException(
          'New due date cannot be earlier than now when reducing due date',
        );
      }
    }

    Object.assign(task, updateTaskDto);

    const updatedTask = await this.taskRepository.save(task);
    await this.cacheInvalidate(task.board.id);

    this.taskGateway.emitTaskUpdated(updatedTask);

    return updatedTask;
  }

  async remove(user: UserPayload, id: number) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (task.user.id !== user.sub && user.role !== UserRole.ADMIN) {
      throw new ForbiddenException('You do not have access to this task');
    }

    await this.taskRepository.softRemove(task);

    await this.cacheInvalidate(task.board.id);

    this.taskGateway.emitTaskDeleted(id, task.board.id);

    return { message: 'Task Removed' };
  }
}
