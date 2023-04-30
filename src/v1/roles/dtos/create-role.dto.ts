import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { Permission } from 'src/v1/permissions/permissions.entity';

export class CreateRoleDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber({}, { each: true })
  @IsNotEmpty()
  @IsArray()
  permissions: (Permission | number)[];
}
