import { CoreEntity } from 'src/common/core/core.entity';
import {
  FindAllKey,
  FindOneKey,
  Relation,
} from 'src/common/decorators/relation.decorator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Category } from '../categories/categories.entity';
import { Comment } from '../comments/comments.entity';
import { Discount } from '../discounts/discounts.entity';
import { File } from '../files/files.entity';
import { Like } from '../likes/likes.entity';
import { User } from '../users/users.entity';
import { Video } from '../videos/videos.entity';

export enum CourseStatus {
  NOT_START = 'NOT_START',
  ACTIVE = 'ACTIVE',
  FINISH = 'FINISH',
  STOP = 'STOP',
}

export enum CourseLevel {
  BEGINNER = 'BEGINNER',
  INTERMEDIATE = 'INTERMEDIATE',
  ADVANCE = 'ADVANCE',
}
@Relation({
  [FindAllKey]: { image: true },
  [FindOneKey]: {
    image: true,
    teacher: true,
    categories: true,
    comments: true,
    likes: true,
  },
})
@Entity({ name: '_courses' })
export class Course extends CoreEntity {
  @Column('varchar', { nullable: false, unique: true, name: 'title' })
  title: string;

  @Column('text', { nullable: false, name: 'description' })
  description: string;

  @OneToOne(() => File)
  @JoinColumn()
  image: File;

  @Column('decimal', { name: 'price', nullable: false })
  price: number;

  @Column('varchar', {
    name: 'status',
    nullable: true,
    default: CourseStatus.NOT_START,
  })
  status: CourseStatus;

  @Column('varchar', { name: 'level', nullable: false })
  level: CourseLevel;

  @ManyToOne(() => User, (user) => user.id)
  teacher: User;

  @ManyToMany(() => Category, (categories) => categories.id)
  @JoinTable({
    name: '_category_course',
    joinColumn: {
      name: 'course',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  @OneToMany(() => Comment, (comment) => comment.course)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.course)
  likes: Like[];

  @OneToOne(() => Discount, (discount) => discount.course, { nullable: false })
  discount?: Discount;

  @OneToMany(() => Video, (video) => video.course, { nullable: true })
  videos?: Video[];

  calculatePrice(extraDiscountPercent: number = 0) {
    if (this.discount) {
      return (
        this.price -
        ((this.discount.percent + extraDiscountPercent) * this.price) / 100
      );
    }

    return this.price - (extraDiscountPercent * this.price) / 100;
  }
}
