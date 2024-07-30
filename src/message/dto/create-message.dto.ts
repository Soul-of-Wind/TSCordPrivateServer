import { MessageEntity } from '../entities/message.entity';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateMessageDto extends MessageEntity {
  @IsNotEmpty()
  channelId: number;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
