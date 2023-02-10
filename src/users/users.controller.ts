import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Req,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //список всех профилей
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  //для просмотра своего профиля
  @Get('me')
  async findOwnOne(@Req() req) {
    const user = await this.usersService.findOne(req.user.id);
    return user;
  }

  //для обновления своего профиля
  @Patch('me')
  async updateOne(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateOne(req.user.id, updateUserDto);
    return this.usersService.findOne(req.user.id);
  }
  //поиск в базе по имени пользователя
  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findByUserName(username);
    return user;
  }
  //поиск в базе по имени или почте пользователя
  @Post('find')
  async findMany(@Body() findUser: FindUserDto) {
    const user = await this.usersService.findMany(findUser);
    return user;
  }
}
