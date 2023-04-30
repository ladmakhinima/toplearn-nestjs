import { CoreEntity } from 'src/common/core/core.entity';
import {
  FindAllKey,
  FindOneKey,
  Relation,
} from 'src/common/decorators/relation.decorator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Bank } from '../banks/banks.entity';
import { User } from '../users/users.entity';

export enum TransactionStatus {
  CONFIRM = 'CONFIRM',
  PENDING = 'PENDING',
  SEEN = 'SEEN',
  REJECT = 'REJECT',
}

@Relation({
  [FindAllKey]: {
    user: true,
    bank: true,
  },
  [FindOneKey]: {
    user: true,
    bank: true,
    registerBy: true,
  },
})
@Entity({ name: '_transactions' })
export class Transaction extends CoreEntity {
  @ManyToOne(() => Bank, (bank) => bank.id)
  bank: Bank;

  @Column({ name: 'amount', nullable: false, type: 'decimal' })
  amount: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({ name: 'register_at', type: 'timestamptz', nullable: true })
  registerAt?: Date;

  @ManyToOne(() => User, (user) => user.id, { nullable: true })
  registerBy?: User;

  @Column({
    name: 'status',
    type: 'varchar',
    default: TransactionStatus.PENDING,
  })
  status?: TransactionStatus;

  @Column({ name: 'description', type: 'text', default: '' })
  description?: string;
}
