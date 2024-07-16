import { MessageDto } from '../dto/message-dto';

export class MessageRepository {
  private static _instance: MessageRepository;
  private messageList: object = {};

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }
  getMessages() {
    return this.messageList;
  }

  addMessage(message: MessageDto) {
    this.messageList[message.id] = message;
    return message
  }
}
