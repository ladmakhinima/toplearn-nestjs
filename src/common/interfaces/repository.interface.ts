import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  UpdateResult,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export interface IRepository<T> {
  create(data: DeepPartial<T>): Promise<T>;
  update(
    where: FindOptionsWhere<T> | number[],
    data: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult>;
  delete(where: FindOptionsWhere<T> | number[]): Promise<DeleteResult>;
  select(where: FindOptionsWhere<T>): Promise<T>;
  selectAll(where: FindOptionsWhere<T>): Promise<T[]>;
  selectById(id: number): Promise<T>;
}
