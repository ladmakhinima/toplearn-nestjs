import { IsInt, IsISO8601, IsNumber, IsOptional } from 'class-validator';
import { Course } from 'src/v1/courses/courses.entity';

export class UpdateDiscountDTO {
  @IsOptional()
  @IsISO8601()
  expiredAt?: Date;

  @IsOptional()
  @IsNumber()
  percent?: number;

  @IsOptional()
  @IsInt()
  course?: number | Course;

  @IsOptional()
  @IsInt()
  quantity?: number;
}
