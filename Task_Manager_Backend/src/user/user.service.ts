import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TaskService } from '../task/task.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => TaskService))
    private readonly taskService: TaskService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAllByTaskId(taskId: number) {
    const task = await this.taskService.findOne(taskId);
    if (!task) {
      throw new NotFoundException('Task doesnt exist');
    }
    const boardId = task.board.id;
    return await this.userRepository.find({
      where: { boards: { id: boardId } },
    });
  }

  async findAllByBoardId(boardId: number) {
    return await this.userRepository.find({
      where: { boards: { id: boardId } },
    });
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, ...safeData }: UpdateUserDto = updateUserDto;
    const user = await this.userRepository.preload({
      id,
      ...safeData,
    });

    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    return this.userRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);

    await this.userRepository.softRemove(user);
    return { message: 'User Removed' };
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async save(user: User) {
    await this.userRepository.save(user);
    return;
  }
}
