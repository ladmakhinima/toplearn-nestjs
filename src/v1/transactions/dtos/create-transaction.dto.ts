import { IsInt, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Bank } from 'src/v1/banks/banks.entity';
import { User } from 'src/v1/users/users.entity';

export class CreateTransactionDTO {
  @IsInt()
  @IsNotEmpty()
  bank: number | Bank;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsInt()
  user: number | User;

  @IsOptional()
  description?: string;
}
