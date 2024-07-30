import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@Catch(WsException)
export class WsExceptionFilter implements ExceptionFilter {
  catch(exception: WsException, host: ArgumentsHost) {
    console.log(':)');
    const client: Socket = host.switchToWs().getClient<Socket>();
    const error = exception.getError();
    const details = typeof error === 'string' ? { message: error } : error;
    console.log(error);
    client.emit('exception', {
      status: 'error',
      ...details,
    });
  }
}
