import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePermissionDTO {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  action: string;

  @IsOptional()
  @IsString({ each: true })
  @IsArray()
  keys: string[];
}
