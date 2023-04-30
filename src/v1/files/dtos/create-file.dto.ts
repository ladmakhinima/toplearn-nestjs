import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { FileType } from '../files.entity';

export class CreateFileDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(FileType)
  type: FileType;
}
