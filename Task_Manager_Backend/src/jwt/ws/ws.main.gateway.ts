import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BoardService } from '../../board/board.service';
import { wsAuthMiddleware } from './ws.middleware';
import { Server } from 'socket.io';
import { AuthSocket } from './ws.auth.socket';
import { UserRole } from '../../user/entities/user.role';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class WsMainGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(private boardService: BoardService) {}

  afterInit(server: Server) {
    server.use(wsAuthMiddleware);
  }

  async handleConnection(client: AuthSocket) {
    const user = client.user;

    if (!user) {
      client.disconnect();
      return;
    }

    if (user.role === UserRole.ADMIN) {
      await client.join('admins');
    } else {
      await client.join(`user:${user.sub}`);
    }

    this.registerBoardEvents(client);
  }

  handleDisconnect(client: AuthSocket) {
    console.log(`Disconnected: ${client.id}`);
  }

  private registerBoardEvents(client: AuthSocket) {
    const user = client.user!;
    const userId = Number(user.sub);

    client.on('board:join', async (boardId: number) => {
      const hasAccess = await this.boardService.userHasAccess(userId, boardId);
      if (!hasAccess) return;

      if (user.role === UserRole.ADMIN) {
        await client.leave('admins');
      } else {
        await client.leave(`user:${user.sub}`);
      }
      await client.join(`board:${boardId}`);
    });

    client.on('board:leave', async (boardId: number) => {
      await client.leave(`board:${boardId}`);

      if (user.role === UserRole.ADMIN) {
        await client.join('admins');
      } else {
        await client.join(`user:${user.sub}`);
      }
    });
  }
}
