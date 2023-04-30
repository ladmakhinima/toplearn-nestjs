import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { envPathHelper } from 'src/common/helper/envPath.helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: envPathHelper(),
    }),
  ],
})
export class ConfigsModule {}
