import { forwardRef, Module } from '@nestjs/common';
import { GenericRepository } from 'src/common/repositories/generic.repository';
import { UsersModule } from '../users/users.module';
import { RefreshToken } from './refresh-token.entity';
import { RefreshTokenService } from './refresh-token.service';

@Module({
  imports: [forwardRef(() => UsersModule)],
  providers: [
    RefreshTokenService,
    {
      provide: GenericRepository,
      useFactory: () => new GenericRepository(RefreshToken),
    },
  ],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
