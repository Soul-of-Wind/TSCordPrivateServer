export class MessageDto {
  content: string;
  created: string;
  channelId: number;
  authorId: string;
  id: string;

  constructor(
    content: string,
    created: string,
    channelId: number,
    authorId: string,
    id: string,
  ) {
    this.content = content;
    this.created = created;
    this.channelId = channelId;
    this.authorId = authorId;
    this.id = id;
  }
}
