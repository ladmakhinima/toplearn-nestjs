import { CoreEntity } from 'src/common/core/core.entity';
import { FindOneKey, Relation } from 'src/common/decorators/relation.decorator';
import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';

@Relation({
  [FindOneKey]: {
    parent: true,
    subcategory: true,
  },
})
@Tree('materialized-path')
@Entity({ name: '_categories' })
export class Category extends CoreEntity {
  @Column('varchar', { unique: true, name: 'title', nullable: false })
  title: string;

  @Column('varchar', { unique: true, name: 'slug', nullable: false })
  slug: string;

  @TreeParent()
  parent: Category;

  @TreeChildren()
  subcategory: Category;
}
