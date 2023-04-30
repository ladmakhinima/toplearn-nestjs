import { IsInt, IsOptional, IsString } from 'class-validator';
import { Category } from '../categories.entity';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsInt()
  parent?: Category | number;
}
