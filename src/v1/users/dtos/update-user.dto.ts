import {
  IsEmail,
  IsEnum,
  IsInt,
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { File } from 'src/v1/files/files.entity';
import { UserStatus } from '../users.entity';

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  username?: string;

  @IsOptional()
  @IsEmail()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @IsOptional()
  @IsInt()
  image?: number | File;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  @IsMobilePhone('fa-IR')
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  firstName?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  lastName?: string;

  @IsOptional()
  @IsString()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
