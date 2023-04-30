import { IsNotEmpty, IsString, MinLength, IsInt } from 'class-validator';
import { Course } from 'src/v1/courses/courses.entity';

export class CreateVideoDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  description: string;

  @IsNotEmpty()
  // @IsInt()
  course: Course | number;
}
