import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.create(createMessageDto, client.id);

    const response = {
      channelId: createMessageDto.channelId,
      message: message,
    };

    this.server.emit('message', response as any);
    return response;
  }

  @SubscribeMessage('findAllMessages')
  findAll(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.chatService.findAll(createMessageDto.channelId);
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    return this.chatService.identify(name, client.id);
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.chatService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping } as any);
  }
}
