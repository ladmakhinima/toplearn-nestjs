import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Permission } from 'src/v1/permissions/permissions.entity';

export class UpdateRoleDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber({}, { each: true })
  @IsOptional()
  @IsArray()
  permissions?: (Permission | number)[];
}
