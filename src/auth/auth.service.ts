import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { User_I } from 'src/interface/interface';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async signIn(email, pass) {
    const user = await this.usersService.findOneByEmail(email);
    console.log('user', user);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync;
    console.log('bbb', access_token);
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(@Body() user: User_I) {
    if (user.email === undefined || user.password === undefined)
      return new Error('Email or password is empty');
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }
}
