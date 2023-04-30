import { Course } from 'src/v1/courses/courses.entity';
import { Discount } from 'src/v1/discounts/discounts.entity';
import { IsNotEmpty, IsString, IsOptional, IsInt } from 'class-validator';
import { User } from 'src/v1/users/users.entity';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsInt()
  course: number | Course;

  @IsOptional()
  @IsInt()
  discount?: number | Discount;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  user: number | User;
}
