import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  firstname!: string;

  @IsNotEmpty()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  lastname!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @Transform(({ value }: { value: unknown }) =>
    typeof value === 'string' ? value.replace(/\s+/g, '') : value,
  )
  phone!: string;

  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
