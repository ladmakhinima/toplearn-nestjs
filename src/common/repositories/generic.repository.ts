import { Inject } from '@nestjs/common';
import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { CoreEntity } from '../core/core.entity';
import { Notification } from '../decorators/notification.decorator';
import {
  FindAllKey,
  FindOneKey,
  GetRelation,
} from '../decorators/relation.decorator';
import { IRepository } from '../interfaces/repository.interface';
import { NotificationsService } from '../notifications/notifications.service';

export class GenericRepository<T extends CoreEntity> implements IRepository<T> {
  constructor(
    private readonly model: (new () => CoreEntity) & typeof CoreEntity,
  ) {}

  @Notification()
  create(data: DeepPartial<T>): Promise<T> {
    return this.model.save(data) as Promise<T>;
  }

  @Notification()
  update(
    where: FindOptionsWhere<T> | number[],
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    console.warn(`
      action: ${this.model.name}
      type: Update
      Parameters: ${JSON.stringify(data)}
    `);
    return this.model.update(where, data);
  }

  @Notification()
  delete(where: FindOptionsWhere<T> | number[]): Promise<DeleteResult> {
    console.warn(`
      action: ${this.model.name}
      type: Delete
      Parameters: ${JSON.stringify(where)}
    `);
    return this.model.delete(where);
  }
  select(where: FindOptionsWhere<T> | FindOptionsWhere<T>[]): Promise<T> {
    return this.model.findOne({ where }) as Promise<T>;
  }
  selectAll(where: FindOptionsWhere<T> = {}): Promise<T[]> {
    const relation = GetRelation(this.model);
    return this.model.find({
      where,
      relations: relation[FindAllKey] || {},
    }) as Promise<T[]>;
  }
  selectById(id: number): Promise<T> {
    const relation = GetRelation(this.model);
    return this.model.findOne({
      where: { id },
      relations: relation[FindOneKey] || {},
    }) as Promise<T>;
  }
}
