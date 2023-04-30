import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsOptional,
  MinLength,
  IsMobilePhone,
  IsInt,
} from 'class-validator';
import { File } from 'src/v1/files/files.entity';

export class SignupDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsInt()
  image?: number | File;

  @IsOptional()
  @IsString()
  @IsMobilePhone('fa-IR')
  phone?: string;
}
