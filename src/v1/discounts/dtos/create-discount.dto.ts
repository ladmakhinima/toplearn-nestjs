import {
  IsEnum,
  IsInt,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Course } from 'src/v1/courses/courses.entity';
import { DiscountType } from '../discounts.entity';

export class CreateDiscountDTO {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsISO8601()
  expiredAt: Date;

  @IsNotEmpty()
  @IsString()
  @IsEnum(DiscountType)
  type: DiscountType;

  @IsNotEmpty()
  @IsNumber()
  percent: number;

  @IsNotEmpty()
  @IsInt()
  course: number | Course;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
