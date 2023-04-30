import { IsInt, IsNumber, IsOptional } from 'class-validator';
import { Bank } from 'src/v1/banks/banks.entity';
import { User } from 'src/v1/users/users.entity';

export class UpdateTransactionDTO {
  @IsOptional()
  @IsInt()
  bank?: number | Bank;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsInt()
  user?: number | User;

  @IsOptional()
  description?: string;
}
