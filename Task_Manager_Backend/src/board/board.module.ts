import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entities/board.entity';
import { UserModule } from '../user/user.module';
import { BoardGateway } from './board.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), forwardRef(() => UserModule)],
  controllers: [BoardController],
  providers: [BoardService, BoardGateway],
  exports: [BoardService],
})
export class BoardModule {}
