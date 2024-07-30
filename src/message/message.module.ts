import { Module } from '@nestjs/common';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { APP_FILTER } from '@nestjs/core';
import { WsExceptionFilter } from './filters/ws-exception.filter';

@Module({
  providers: [
    MessageGateway,
    MessageService,
  ],
})
export class MessageModule {}
