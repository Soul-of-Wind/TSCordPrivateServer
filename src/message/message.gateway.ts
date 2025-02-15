import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Server, Socket } from 'socket.io';
import { response } from 'express';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('createMessage')
  async create(
    @MessageBody() createMessageDto: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messageService.create(
      createMessageDto,
      client.id,
    );

    const response = {
      channelId: createMessageDto.channelId,
      message: message,
    };

    this.server.emit('message', response as any);
    return response;
  }

  @SubscribeMessage('findAllMessages')
  findAll(@MessageBody() createMessageDto: CreateMessageDto) {
    return this.messageService.findAll(createMessageDto.channelId);
  }

  @SubscribeMessage('findAllChannels')
  findAllChannels() {
    return this.messageService.channelList;
  }

  @SubscribeMessage('findAllUsers')
  findAllUsers() {
    return Object.values(this.messageService.clientToUser);
  }

  @SubscribeMessage('join')
  joinRoom(
    @MessageBody('name') name: string,
    @ConnectedSocket() client: Socket,
  ) {
    this.messageService.identify(name, client.id);
    this.server.emit('joinUser');
  }

  @SubscribeMessage('typing')
  async typing(
    @MessageBody('isTyping') isTyping: boolean,
    @ConnectedSocket() client: Socket,
  ) {
    const name = await this.messageService.getClientName(client.id);
    client.broadcast.emit('typing', { name, isTyping } as any);
  }

  handleDisconnect(client: Socket): any {
    this.messageService.disconnect(client.id);
    this.server.emit('joinUser');
  }
}
