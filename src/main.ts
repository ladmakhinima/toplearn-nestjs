import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import express from 'express';

const bootstrap = async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);
  const appPort = configService.getOrThrow<number>('PORT') || 3000;
  const mediaPath = join(__dirname, '..', 'public');
  app.useStaticAssets(mediaPath);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(appPort, () => {
    console.log(`The server is running at ${appPort}`);
  });
};

bootstrap();
