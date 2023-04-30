import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: '_permissions' })
export class Permission extends CoreEntity {
  @Column('varchar', { name: 'title', unique: true, nullable: false })
  title: string;

  @Column('varchar', { name: 'action', nullable: false })
  action: string;

  @Column('varchar', { name: 'keys', nullable: false, array: true })
  keys: string[];
}
