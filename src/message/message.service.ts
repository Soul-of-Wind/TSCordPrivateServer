import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChannelEntity } from './entities/channel.entity';
import moment from 'moment';

@Injectable()
export class MessageService {
  // messages: MessageEntity[] = [{ name: 'Kotaro', text: 'Hi all!' }];
  channelList: ChannelEntity[] = [
    { name: 'Текстовый 1', id: 1, messages: [] },
    { name: 'Текстовый 2', id: 2, messages: [] },
  ];
  clientToUser = {};

  async create(createMessageDto: CreateMessageDto, clientId: string) {
    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
      created: moment().format('Y-m-d H:i:s'),
    };

    this.getChannel(createMessageDto.channelId)?.messages.push(message);

    return message;
  }

  getChannel(id: number): ChannelEntity | undefined {
    return this.channelList.find((i) => i.id === id);
  }

  findAll(channelId: number) {
    return this.getChannel(channelId)?.messages || [];
  }

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  disconnect(clientId: string) {
    delete this.clientToUser[clientId];
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
