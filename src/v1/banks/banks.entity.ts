import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: '_banks' })
export class Bank extends CoreEntity {
  @Column({ name: 'name', nullable: false, unique: true, type: 'varchar' })
  name: string;

  @Column({ name: 'slug', nullable: false, unique: true, type: 'varchar' })
  slug: string;

  @Column({ name: 'is_active', default: false })
  isActive?: boolean;
}
