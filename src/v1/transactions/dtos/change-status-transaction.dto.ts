import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { TransactionStatus } from '../transactions.entity';

export class ChangeStatusTransactionDTO {
  @IsNotEmpty()
  @IsString()
  @IsEnum(TransactionStatus)
  status: TransactionStatus;
}
