import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class ChatGateway implements OnGatewayDisconnect, OnGatewayConnection {
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string) {
    // const message: string = data.message; // Извлекаем строку из объекта data
    this.server.emit('onMessage', { data });
  }

  handleConnection(client: Socket): any {
    console.log(client.id);
    console.log('Connected');
  }

  handleDisconnect(client: Socket): any {
    console.log(client.id);
    console.log('Disconnect');
  }
}
