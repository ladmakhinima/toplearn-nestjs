import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateBankDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  slug: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
