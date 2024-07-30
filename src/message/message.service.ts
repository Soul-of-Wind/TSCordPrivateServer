import { Injectable, UsePipes } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { ChannelEntity } from './entities/channel.entity';

@Injectable()
export class MessageService {
  // messages: MessageEntity[] = [{ name: 'Kotaro', text: 'Hi all!' }];
  channelList: ChannelEntity[] = [
    { name: 'Текстовый 1', id: 1, messages: [] },
    { name: 'Текстовый 2', id: 2, messages: [] },
  ];
  clientToUser = {};

  async create(createMessageDto: CreateMessageDto, clientId: string) {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month =
      currentDate.getMonth() >= 10
        ? currentDate.getMonth() + 1
        : '0' + (currentDate.getMonth() + 1);
    const days =
      currentDate.getDate() >= 10
        ? currentDate.getDate()
        : '0' + currentDate.getDate();
    const hours =
      currentDate.getHours() >= 10
        ? currentDate.getHours()
        : '0' + currentDate.getHours();
    const minutes =
      currentDate.getMinutes() >= 10
        ? currentDate.getMinutes()
        : '0' + currentDate.getMinutes();
    const seconds =
      currentDate.getSeconds() >= 10
        ? currentDate.getSeconds()
        : '0' + currentDate.getSeconds();

    const message = {
      name: this.clientToUser[clientId],
      text: createMessageDto.text,
      created: `${year}-${month}-${days} ${hours}:${minutes}:${seconds}`,
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

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
}
