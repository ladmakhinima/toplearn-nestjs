import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateBankDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  slug: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
