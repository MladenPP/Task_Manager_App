import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';
import { TaskStatus } from '../entities/task.status';
import { toSortBy } from '../entities/to.sort.by';
import { Transform } from 'class-transformer';

export class SearchTaskDto {
  @IsNotEmpty()
  boardId!: number;

  @IsOptional()
  search!: string;

  @IsOptional()
  status!: TaskStatus;

  @IsOptional()
  toSortBy!: toSortBy;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null) return undefined;
    const parsed = Number(value);
    return isNaN(parsed) ? undefined : parsed;
  })
  @IsInt()
  @Min(1)
  page!: number;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === '' || value === null) return 8;
    const parsed = Number(value);
    return isNaN(parsed) ? 8 : parsed;
  })
  @IsInt()
  @Min(1)
  pageSize!: number;
}
