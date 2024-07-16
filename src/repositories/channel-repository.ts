export class ChannelRepository {
  private channelList: object = {
    '1': {
      id: '1',
      name: 'test-1',
    },
    '2': {
      id: '2',
      name: 'test-2',
    },
  };

  getChannelList(){
    return this.channelList;
  }
}
