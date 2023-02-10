import {
  Controller,
  Get,
  Body,
  Patch,
  Req,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/jwt.guard';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//Список всех порфилей
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
//для просмотра своего профиля
  @Get('me')
  async findOwnOne(@Req() req) {
    console.log(req.user)
    return await this.usersService.findOne(req.user.id);
  }

  //для обновления своего профиля
  @Patch('me')
  async updateOne(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateOne(req.user.id, updateUserDto);
    return this.usersService.findOne(req.user.id);
  }
}
