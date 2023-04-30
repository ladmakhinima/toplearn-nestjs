import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ForgetPasswordDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  newPassword: string;
}
