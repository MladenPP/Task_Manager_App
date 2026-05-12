import { IsNotEmpty, MinLength } from 'class-validator';

export class PasswordDto {
  @IsNotEmpty()
  @MinLength(6)
  oldPassword!: string;

  @IsNotEmpty()
  @MinLength(6)
  newPassword!: string;
}
