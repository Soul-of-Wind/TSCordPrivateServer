import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { MessageRepository } from '../repositories/message-repository';
import { MessageDto } from '../dto/message-dto';
import { UserDto } from '../dto/user-dto';
import { UserRepository } from '../repositories/user-repository';

@WebSocketGateway(3002, { cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  historyChat: any[] = [];

  @SubscribeMessage('newMessage')
  handleMessage(client: Socket, message: any) {
    console.log(message);
    const response = MessageRepository.Instance.addMessage(
      new MessageDto(
        message.content,
        message.createdat,
        message.channelId,
        client.id,
        this.makeid(20),
      ),
    );
    this.server.emit('reply', JSON.stringify(response));
  }

  handleConnection(client: any): any {
    console.log('New user connected', client.id);

    const response = MessageRepository.Instance.addMessage(
      new MessageDto(
        `User join the chat: ${client.id}`,
        '2024-07-16 13:27:33',
        1,
        client.id,
        this.makeid(20),
      ),
    );

    UserRepository.Instance.addUser(
      new UserDto(client.id, `test-${client.id}`),
    );

    this.server.emit('user-join-chat', {
      message: JSON.stringify(response),
    });
  }

  handleDisconnect(client: any): any {
    console.log('New user disconnected', client.id);


    const response = MessageRepository.Instance.addMessage(
      new MessageDto(
        `User leave the chat: ${client.id}`,
        '2024-07-16 13:27:33',
        1,
        client.id,
        this.makeid(20),
      ),
    );

    UserRepository.Instance.removeUser(
      new UserDto(client.id, `test-${client.id}`),
    );

    this.server.emit('user-leave-chat', {
      message: JSON.stringify(response),
    });
  }

  makeid(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
