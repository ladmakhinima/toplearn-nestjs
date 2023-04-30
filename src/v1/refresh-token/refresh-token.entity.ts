import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from '../users/users.entity';

@Entity({ name: '_refresh_tokens' })
export class RefreshToken extends CoreEntity {
  @Column({ name: 'code', type: 'text', unique: true, nullable: false })
  code: string;

  @Column({ name: 'expired_at', type: 'timestamptz', nullable: false })
  expiredAt: Date;

  @Column({ name: 'is_delete', default: false, type: 'boolean' })
  isDelete?: boolean;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
