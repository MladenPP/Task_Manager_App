import {
  Controller,
  Get,
  Body,
  Patch,
  Delete,
  UseGuards,
  Res,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../jwt/jwt.authguard';
import type { UserPayload } from './interfaces/user.payload';
import { User } from './decorators/user.decorator';
import type { Response } from 'express';
import { RolesGuard } from '../jwt/jwt.rolesguard';
import { Roles } from './decorators/user.role.decorator';
import { UserRole } from './entities/user.role';
import { AuditLog } from '../logger/decorators/audit-log.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @AuditLog('USER_PROFILE')
  findOne(@User() user: UserPayload) {
    const id: number = user.sub;
    return this.userService.findOne(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @AuditLog('USER_ID')
  findAllByTaskId(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findAllByTaskId(id);
  }

  @Get('board/:id')
  @UseGuards(JwtAuthGuard)
  @AuditLog('USER_ON_BOARD')
  findAllByBoardId(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findAllByBoardId(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @AuditLog('ALL_USERS')
  findAll() {
    return this.userService.findAll();
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  @AuditLog('UPDATE_USER')
  update(@User() user: UserPayload, @Body() updateUserDto: UpdateUserDto) {
    const id: number = user.sub;
    return this.userService.update(id, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  @AuditLog('DELETE_USER')
  remove(@User() user: UserPayload, @Res({ passthrough: true }) res: Response) {
    const id: number = user.sub;
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: process.env.DB_SECURE === 'production',
      maxAge: 0,
    });
    return this.userService.remove(id);
  }
}
