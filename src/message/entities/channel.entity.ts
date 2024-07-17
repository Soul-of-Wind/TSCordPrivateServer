import { MessageEntity } from './message.entity';

export class ChannelEntity {
  name: string;
  id: number;
  messages: MessageEntity[];
}
