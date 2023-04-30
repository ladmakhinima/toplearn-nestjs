import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Course } from '../courses/courses.entity';

export enum DiscountType {
  All = 'All',
  Single = 'Single',
}

@Entity({ name: '_discount' })
export class Discount extends CoreEntity {
  @Column({ name: 'code', type: 'varchar', nullable: false, unique: true })
  code: string;

  @Column({ name: 'expired_at', type: 'timestamptz', nullable: false })
  expiredAt: Date;

  @Column({ name: 'type', type: 'varchar', nullable: false })
  type: DiscountType;

  @Column({ name: 'percent', type: 'decimal', nullable: false })
  percent: number;

  @OneToOne(() => Course, (course) => course.discount, { nullable: false })
  @JoinColumn()
  course?: Course;

  @Column({ name: 'quantity', type: 'int', nullable: false })
  quantity: number;
}
