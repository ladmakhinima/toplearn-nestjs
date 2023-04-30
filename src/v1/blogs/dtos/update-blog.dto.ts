import { IsInt, IsOptional, IsString } from 'class-validator';
import { Category } from 'src/v1/categories/categories.entity';
import { File } from 'src/v1/files/files.entity';

export class UpdateBlogDTO {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsInt()
  image?: number;

  @IsOptional()
  @IsInt({ each: true })
  categories?: (Category | number)[];
}
