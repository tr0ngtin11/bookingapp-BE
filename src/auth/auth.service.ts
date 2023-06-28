import { Body, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User_I } from 'src/interface/interface';
import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async signIn(
    email: string,
    pass: string,
  ): Promise<{ status: boolean; access_token: string; user: User } | boolean> {
    try {
      const user = (await this.usersService.findOneByEmail(email)) as User;
      // console.log('🚀 ~ file: auth.service.ts:23 ~ AuthService ~ user:', user);

      if (user) {
        const hashPassword = user.password;
        const isMatch = await bcrypt.compare(pass, hashPassword);
        if (isMatch) {
          const payload = { id: user.id, email: user.email, role: user.role };
          return {
            status: true,
            access_token: await this.jwtService.signAsync(payload),
            user: user,
          };
        } else return false;
      } else return false;
    } catch (error) {
      return false;
    }
  }

  async signUp(@Body() user: User_I): Promise<boolean> {
    try {
      if (user.email === undefined || user.password === undefined) return false;
      const newUser = await this.usersRepository.create(user);
      await this.usersRepository.save(newUser);
      return true;
    } catch (error) {
      return false;
    }
  }
}
