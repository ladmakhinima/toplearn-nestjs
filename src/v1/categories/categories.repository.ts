import { Inject } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { DataSource, In } from 'typeorm';
import { Category } from './categories.entity';

export class CategoriesRepository extends GenericRepository<Category> {
  @Inject(DataSource)
  private readonly dataSource: DataSource;
  constructor() {
    super(Category);
  }
  selectByIds(ids: number[]) {
    return Category.find({ where: { id: In(ids) } });
  }

  selectTrees() {
    return this.dataSource.getTreeRepository(Category).findTrees({ depth: 3 });
  }
}
