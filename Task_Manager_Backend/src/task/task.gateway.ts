import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Task } from './entities/task.entity';
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class TaskGateway {
  @WebSocketServer()
  server!: Server;

  private payloadFormatter(task: Task) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      dueDate: task.dueDate,
    };
  }

  emitTaskCreated(task: Task) {
    const payload = this.payloadFormatter(task);
    const boardId = task.board.id;

    this.server.to(`board:${boardId}`).emit('task:created', payload);
  }

  emitTaskUpdated(task: Task) {
    const payload = this.payloadFormatter(task);
    const boardId = task.board.id;

    this.server.to(`board:${boardId}`).emit('task:updated', payload);
  }

  emitTaskDeleted(taskId: number, boardId: number) {
    this.server.to(`board:${boardId}`).emit('task:deleted', taskId);
  }
}
