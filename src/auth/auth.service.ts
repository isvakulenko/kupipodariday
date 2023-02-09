/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  auth(user: User) {
    // тут будем генерировать токен
    const payload = { sub: user.id };

    return { access_token: this.jwtService.sign(payload) };
  }
  
  // метод validatePassword проверяет,
  //  совпадает ли пароль пользователя с тем, что есть в базе.
  async validatePassword(username: string, password: string) {
    console.log(username, password)
    const user = await this.usersService.findByUsername(username); 
    console.log('user', user)
    /* В идеальном случае пароль обязательно должен быть захэширован */
    if (user && user.password === password) {
      /* Исключаем пароль из результата */
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  }
