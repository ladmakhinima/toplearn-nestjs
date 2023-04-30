import { Column, Entity } from 'typeorm';
import { CoreEntity } from '../core/core.entity';

@Entity({ name: '_notifications' })
export class Notification extends CoreEntity {
  @Column({ name: 'action', type: 'varchar', nullable: false })
  action: string;

  @Column({ name: 'type', type: 'varchar', nullable: false })
  type: string;

  @Column({
    name: 'parameters',
    type: 'text',
    nullable: false,

    transformer: {
      from: (value) => JSON.parse(value),
      to(value) {
        return value;
      },
    },
  })
  parameters: string;
}
