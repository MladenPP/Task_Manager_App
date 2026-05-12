import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { JwtAuthGuard } from '../jwt/jwt.authguard';
import { Throttle } from '@nestjs/throttler';
import { User } from '../user/decorators/user.decorator';
import type { UserPayload } from '../user/interfaces/user.payload';
import { RolesGuard } from '../jwt/jwt.rolesguard';
import { Roles } from '../user/decorators/user.role.decorator';
import { UserRole } from '../user/entities/user.role';
import { AuditLog } from '../logger/decorators/audit-log.decorator';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @AuditLog('CREATE_BOARD')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  create(@User() user: UserPayload, @Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @AuditLog('FIND_ALL_BOARDS')
  findAll(@User() user: UserPayload) {
    return this.boardService.findAll(user);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @AuditLog('GET_BOARD')
  findOne(@User() user: UserPayload, @Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id, user.sub);
  }

  @Patch('add/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @AuditLog('ADD_USER_TO_BOARD')
  addUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.boardService.addUser(id, userId);
  }

  @Patch('remove/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @AuditLog('REMOVE_USER_FROM_BOARD')
  removeUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.boardService.removeUser(id, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @AuditLog('DELETE_BOARD')
  remove(@User() user: UserPayload, @Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id, user);
  }
}
