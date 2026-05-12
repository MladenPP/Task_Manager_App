import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../task/entities/task.entity';
import { User } from '../user/entities/user.entity';
import { Board } from '../board/entities/board.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: String(config.getOrThrow('DB_HOST')),
        port: Number(config.getOrThrow('DB_PORT')),
        username: String(config.getOrThrow('DB_USER')),
        password: String(config.getOrThrow('DB_PASS')),
        database: String(config.getOrThrow('DB_NAME')),

        entities: [User, Task, Board],
        synchronize: config.get('NODE_ENV') === 'development',
      }),
    }),
  ],
})
export class DbModule {}
