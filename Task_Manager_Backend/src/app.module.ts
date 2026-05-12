import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DbModule } from './database/db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TaskModule } from './task/task.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { BoardModule } from './board/board.module';
import { WsMainGateway } from './jwt/ws/ws.main.gateway';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger/logger.config';

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: process.env.REDIS_HOST || 'localhost',
            port: Number(process.env.REDIS_PORT) || 6379,
          },
        });

        return {
          store: () => store,
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 6000,
          limit: 60, // lower for production
        },
      ],
    }),
    WinstonModule.forRoot(winstonConfig),
    UserModule,
    DbModule,
    AuthModule,
    TaskModule,
    BoardModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    WsMainGateway,
  ],
})
export class AppModule {}
