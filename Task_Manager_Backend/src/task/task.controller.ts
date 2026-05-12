import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../jwt/jwt.authguard';
import { User } from '../user/decorators/user.decorator';
import type { UserPayload } from '../user/interfaces/user.payload';
import { SearchTaskDto } from './dto/search-task.dto';
import { Throttle } from '@nestjs/throttler';
import { AuditLog } from '../logger/decorators/audit-log.decorator';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @AuditLog('CREATE_TASK')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  create(@User() user: UserPayload, @Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto, user);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @AuditLog('TASKS_GET_ALL')
  findAll(@User() user: UserPayload, @Query() searchTaskDto: SearchTaskDto) {
    return this.taskService.findAll(user, searchTaskDto);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @AuditLog('FIND_TASK')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @AuditLog('UPDATE_TASK')
  async update(
    @User() user: UserPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.update(user, id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @AuditLog('DELETE_TASK')
  remove(@User() user: UserPayload, @Param('id', ParseIntPipe) id: number) {
    return this.taskService.remove(user, id);
  }
}
