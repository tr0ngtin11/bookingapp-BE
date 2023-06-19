import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { User_I } from 'src/interface/interface';
import { async } from 'rxjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(userDetail: User_I) {
    try {
      const newUser = await this.usersRepository.create(userDetail);
      await this.usersRepository.save(newUser);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.usersRepository.update(id, updateUserDto);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async remove(id: number) {
    try {
      await this.usersRepository.delete(id);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
