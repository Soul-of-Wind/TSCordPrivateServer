import { MessageEntity } from '../entities/message.entity';
import { IsNumber, IsDefined, Min, IsString, MinLength } from 'class-validator';
import { IsNotBlank } from 'nestjs-validators';

export class CreateMessageDto extends MessageEntity {
  @IsDefined()
  @IsNumber()
  @Min(1)
  channelId: number;

  @IsDefined()
  @IsString()
  @MinLength(1)
  @IsNotBlank()
  text: string;

  @IsDefined()
  @IsString()
  name: string;
}
