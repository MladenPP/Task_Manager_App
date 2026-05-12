import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { PasswordDto } from './dto/password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    const data = {
      sub: user.id,
      role: user.role,
    };

    const token = await this.jwt.signAsync(data);

    return token;
  }

  async register(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async changePass(id: number, passwordDto: PasswordDto) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new BadRequestException('Not Signed In');
    }

    const isMatch = await bcrypt.compare(
      passwordDto.oldPassword,
      user.password,
    );

    if (!isMatch) {
      throw new BadRequestException('Wrong password');
    }

    const hashedPassword = await bcrypt.hash(passwordDto.newPassword, 10);
    user.password = hashedPassword;
    await this.userService.save(user);

    return { message: 'Password changed successfully' };
  }
}
