import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatus } from '../entities/task.status';
import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  status!: TaskStatus;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueDate?: Date;
}
