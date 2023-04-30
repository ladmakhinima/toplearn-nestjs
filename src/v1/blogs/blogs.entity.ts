import { Category } from './../categories/categories.entity';
import { CoreEntity } from 'src/common/core/core.entity';
import { User } from '../users/users.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { File } from '../files/files.entity';
import {
  FindAllKey,
  FindOneKey,
  Relation,
} from 'src/common/decorators/relation.decorator';

@Relation({
  [FindOneKey]: {
    image: true,
    author: true,
    categories: true,
  },
  [FindAllKey]: {
    image: true,
    author: true,
  },
})
@Entity({ name: '_blogs' })
export class Blog extends CoreEntity {
  @Column('varchar', { unique: true, nullable: false, name: 'title' })
  title: string;

  @Column('text', { name: 'text', nullable: false })
  text: string;

  @ManyToOne(() => File, (file) => file.id)
  image: File;

  @ManyToOne(() => User, (user) => user.id)
  author: User;

  @ManyToMany(() => Category, (category) => category.id)
  @JoinTable()
  categories: Category[];
}
