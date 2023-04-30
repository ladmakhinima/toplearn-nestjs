import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Permission } from '../permissions/permissions.entity';

@Entity({ name: '_roles' })
export class Role extends CoreEntity {
  @Column('varchar', { name: 'title', nullable: false, unique: true })
  title: string;

  @Column('text', { name: 'description', nullable: false })
  description: string;

  @OneToMany(() => Permission, (permission) => permission.id)
  permissions: Permission[];
}
