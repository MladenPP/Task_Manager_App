import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import type { UserPayload } from '../user/interfaces/user.payload';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { UserRole } from '../user/entities/user.role';
import { UserService } from '../user/user.service';
import { BoardGateway } from './board.gateway';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board) private boardRepository: Repository<Board>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly boardGateway: BoardGateway,
  ) {}

  async create(createBoardDto: CreateBoardDto, user: UserPayload) {
    const id = user.sub;
    const board = this.boardRepository.create({
      ...createBoardDto,
      users: [{ id }],
    });
    const newBoard = await this.boardRepository.save(board);
    this.boardGateway.emitBoardCreated(newBoard);
    return newBoard;
  }

  async findAll(user: UserPayload) {
    if (user.role === UserRole.ADMIN) {
      const boards = await this.boardRepository.find();

      return boards;
    }
    const boards = await this.boardRepository.find({
      where: { users: { id: user.sub } },
      relations: ['users'],
    });

    return boards;
  }

  async findOne(id: number, userId: number) {
    const board = await this.boardRepository.findOne({
      where: { id: id, users: { id: userId } },
      relations: ['users'],
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }

    return board;
  }

  async addUser(id: number, userId: number) {
    const board = await this.boardRepository.findOne({
      where: { id: id },
      relations: ['users'],
    });

    const user = await this.userService.findOne(userId);

    if (!board || !user)
      throw new NotFoundException('Selected board or user do not exist');

    board.users.push(user);

    const updatedBoard = await this.boardRepository.save(board);

    this.boardGateway.emitUserAddedToBoard(updatedBoard, userId);

    return updatedBoard;
  }

  async removeUser(id: number, userId: number) {
    const board = await this.boardRepository.findOne({
      where: { id },
      relations: ['users'],
    });

    const user = await this.userService.findOne(userId);

    if (!board || !user)
      throw new NotFoundException('Selected board or user do not exist');

    board.users = board.users.filter((user) => user.id !== userId);

    const updatedBoard = await this.boardRepository.save(board);

    this.boardGateway.emitUserRemovedFromBoard(id, userId);

    return updatedBoard;
  }

  async remove(id: number, user: UserPayload) {
    const board = await this.boardRepository.findOne({
      where: { id: id, users: { id: user.sub } },
      relations: ['users'],
    });

    if (!board) {
      throw new NotFoundException('Board not found');
    }
    await this.boardRepository.softRemove(board);
    this.boardGateway.emitBoardDeleted(id, user.sub);

    return { message: 'Board deleted' };
  }

  async userHasAccess(userId: number, boardId: number) {
    const board = await this.boardRepository.findOne({
      where: { id: boardId, users: { id: userId } },
      relations: ['users'],
    });
    if (board) return true;
    return false;
  }
}
