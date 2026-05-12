import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { GlobalExceptionFilter } from './filters/global.exception.filter';
import { AuditInterceptor } from './logger/interceptors/audit.interceptor';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new AuditInterceptor(app.get(Reflector), app.get(WINSTON_MODULE_PROVIDER)),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 5000;
  await app.listen(port);
}
bootstrap();
