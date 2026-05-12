import { Body, Controller, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtAuthGuard } from '../jwt/jwt.authguard';
import type { UserPayload } from '../user/interfaces/user.payload';
import { User } from '../user/decorators/user.decorator';
import { LoginDto } from './dto/login.dto';
import { PasswordDto } from './dto/password.dto';
import type { Response } from 'express';
import { Throttle } from '@nestjs/throttler';
import 'dotenv/config';
import { AuditLog } from '../logger/decorators/audit-log.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Throttle({ default: { limit: 5, ttl: 60 } })
  @AuditLog('LOGIN')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const jwt = await this.authService.login(loginDto.email, loginDto.password);
    res.cookie('access_token', jwt, {
      httpOnly: true,
      secure: process.env.DB_SECURE === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60,
    });
    return { message: 'Logged in' };
  }

  @Post('register')
  @AuditLog('REGISTER')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  @AuditLog('CHANGE_PASS')
  @Throttle({ default: { limit: 20, ttl: 60 } })
  changePass(@User() user: UserPayload, @Body() passwordDto: PasswordDto) {
    const id: number = user.sub;
    return this.authService.changePass(id, passwordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @AuditLog('LOGOUT')
  logout(@User() user: UserPayload, @Res({ passthrough: true }) res: Response) {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: process.env.DB_SECURE === 'production',
      sameSite: 'lax',
      maxAge: 0,
    });
    return;
  }
}
