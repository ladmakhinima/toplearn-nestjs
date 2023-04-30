import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Course } from 'src/v1/courses/courses.entity';
import { Comment } from '../comments.entity';

export class CreateCommentDTO {
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsOptional()
  @IsInt()
  parentComment?: Comment | number;
  @IsOptional()
  @IsInt()
  course: Course | number;
}
