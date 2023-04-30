import {
  IsDecimal,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { Category } from 'src/v1/categories/categories.entity';
import { File } from 'src/v1/files/files.entity';
import { CourseLevel, CourseStatus } from '../courses.entity';

export class UpdateCourseDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: number | File;

  @IsOptional()
  @IsDecimal(true)
  price?: number;

  @IsOptional()
  @IsString()
  @IsEnum(CourseStatus)
  status?: CourseStatus;

  @IsOptional()
  @IsString()
  @IsEnum(CourseLevel)
  level?: CourseLevel;

  @IsOptional()
  @IsInt({ each: true })
  categories?: (Category | number)[];
}
