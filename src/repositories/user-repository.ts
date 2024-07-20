import { UserDto } from '../dto/user-dto';

export class UserRepository {
  public static _instance: UserRepository;
  private userList: object = {};

  private constructor() {}

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  getUserList() {
    return this.userList;
  }

  addUser(user: UserDto) {
    this.userList[user.id] = user;
    return user;
  }

  removeUser(user: UserDto) {
    delete this.userList[user.id];
    return user;
  }
}
