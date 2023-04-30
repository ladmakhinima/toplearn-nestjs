import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Category } from '../categories.entity';

export class CreateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  @IsInt()
  parent?: Category | number;
}
