import { IsNotEmpty, IsString, Length } from 'class-validator';

export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsString()
  @Length(10)
  refreshToken: string;
}
