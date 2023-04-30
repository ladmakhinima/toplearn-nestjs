import { CoreEntity } from 'src/common/core/core.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Course } from '../courses/courses.entity';

@Entity({ name: '_videos' })
export class Video extends CoreEntity {
  @Column({ name: 'title', type: 'varchar', nullable: false, unique: true })
  title: string;

  @Column({ name: 'description', type: 'text', nullable: false })
  description: string;

  @Column({ name: 'src', type: 'text', nullable: false })
  src: string;

  @ManyToOne(() => Course, (course) => course.id)
  course: Course;
}
