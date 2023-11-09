import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() userInfo: any) {
    const res = await this.userService.create(userInfo);
    return {
      code: 0,
      msg: '创建成功',
      data: res,
    };
  }

  @Get('/queryList')
  async getAllUsers() {
    const res = await this.userService.findAll();
    return {
      code: 0,
      msg: '请求成功',
      data: res,
    };
  }

  @Delete('/delete/:name')
  async removeGoods(@Param('name') name: string) {
    const res = await this.userService.delete(name);
    return {
      code: 0,
      msg: '删除成功',
      data: res,
    };
  }

  @Patch()
  async updateGoods(@Body() userInfo: any) {
    const res = await this.userService.update(userInfo);
    return {
      code: 0,
      msg: '修改成功',
      data: res,
    };
  }
}
