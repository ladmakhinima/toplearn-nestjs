import {
  IsArray,
  IsDecimal,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Category } from 'src/v1/categories/categories.entity';
import { User } from 'src/v1/users/users.entity';
import { CourseLevel } from '../courses.entity';

export class CreateCourseDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsInt()
  image: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(CourseLevel)
  level: CourseLevel;

  @IsNotEmpty()
  @IsInt({ each: true })
  @IsArray()
  categories: (Category | number)[];

  @IsNotEmpty()
  @IsInt()
  teacher: number | User;
}
