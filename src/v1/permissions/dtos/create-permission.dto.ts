import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDTO {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  keys: string[];
}
