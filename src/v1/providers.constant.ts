import { Provider } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { Bank } from './banks/banks.entity';
import { Blog } from './blogs/blogs.entity';
import { Category } from './categories/categories.entity';
import { Comment } from './comments/comments.entity';
import { Course } from './courses/courses.entity';
import { Discount } from './discounts/discounts.entity';
import { File } from './files/files.entity';
import { Like } from './likes/likes.entity';
import { Order } from './orders/orders.entity';
import { Permission } from './permissions/permissions.entity';
import { RefreshToken } from './refresh-token/refresh-token.entity';
import { Role } from './roles/roles.entity';
import { Transaction } from './transactions/transactions.entity';
import { User } from './users/users.entity';

export const likesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Like),
};

export const commentsRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Comment),
};

export const usersRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(User),
};

export const rolesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Role),
};

export const refreshTokenRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(RefreshToken),
};

export const permissionRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Permission),
};

export const filesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(File),
};

export const coursesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Course),
};

export const categoriesRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Category),
};

export const blogsRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Blog),
};

export const banksRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Bank),
};

export const transactionsRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Transaction),
};

export const discountsRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Discount),
};

export const ordersRepositoryProvider: Provider = {
  provide: GenericRepository,
  useFactory: () => new GenericRepository(Order),
};
