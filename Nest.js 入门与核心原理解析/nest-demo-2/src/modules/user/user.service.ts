import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  async create(userInfo: any) {
    globalThis.UsersStorage.push(userInfo);
    return userInfo;
  }

  async findAll() {
    return globalThis.UsersStorage;
  }

  async delete(name: string) {
    const idx = globalThis.UsersStorage.findIndex((item) => item.name === name);
    globalThis.UsersStorage.splice(idx, 1);
    return globalThis.UsersStorage;
  }

  async update(userInfo: any) {
    const idx = globalThis.UsersStorage.findIndex(
      (item) => item.name === userInfo.name,
    );
    globalThis.UsersStorage[idx].age = userInfo.age;
    return globalThis.UsersStorage;
  }
}
