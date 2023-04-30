import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Category } from 'src/v1/categories/categories.entity';
import { File } from 'src/v1/files/files.entity';

export class CreateBlogDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsInt()
  image: number | File;

  @IsNotEmpty()
  @IsInt({ each: true })
  categories: (Category | number)[];
}
