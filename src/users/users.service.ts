import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { User_I } from 'src/interface/interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(userDetail: User_I) {
    const newUser = this.usersRepository.create(userDetail);
    return this.usersRepository.save(newUser);
  }

  findAll() {
    const users = this.usersRepository.find();
    return users;
  }

  findOne(id: number) {
    const user = this.usersRepository.findOne({ where: { id } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const res = this.usersRepository.update(id, updateUserDto);
    return res;
  }

  remove(id: number) {
    const res = this.usersRepository.delete(id);
    return res;
  }
}
