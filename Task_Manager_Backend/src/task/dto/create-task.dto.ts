import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, Validate } from 'class-validator';
import { DateValidator } from '../validators/task.validator';

export class CreateTaskDto {
  @IsNotEmpty()
  boardId!: number;

  @IsOptional()
  userId!: number;

  @IsNotEmpty()
  title!: string;

  @Type(() => Date)
  @Validate(DateValidator)
  dueDate!: Date;

  @IsNotEmpty()
  description!: string;
}
