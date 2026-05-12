import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Board } from './entities/board.entity';
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class BoardGateway {
  @WebSocketServer()
  server!: Server;

  private payloadFormatter(board: Board) {
    return {
      id: board.id,
      name: board.name,
    };
  }

  emitBoardCreated(board: Board) {
    const payload = this.payloadFormatter(board);

    this.server.to('admins').emit('board:created', payload);
  }

  emitUserAddedToBoard(board: Board, userId: number) {
    const payload = this.payloadFormatter(board);
    this.server.to(`user:${userId}`).emit('board:useradd', payload);
  }

  emitUserRemovedFromBoard(boardId: number, userId: number) {
    this.server.to(`user:${userId}`).emit('board:userremove', boardId);
  }

  //   emitBoardUpdated(board: Board, userId: number) {
  //     const payload = this.payloadFormatter(board);

  //     this.server.to(`user:${userId}`).emit('board:updated', payload);
  //     this.server.to('admins').emit('board:updated', payload);
  //   }

  emitBoardDeleted(boardId: number, userId: number) {
    this.server.to(`user:${userId}`).emit('board:deleted', boardId);
    this.server.to('admins').emit('board:deleted', boardId);
  }
}
