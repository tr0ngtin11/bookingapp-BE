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
  async create(userDetail: User_I) {
    try {
      const newUser = await this.usersRepository.create(userDetail);
      await this.usersRepository.save(newUser);
      return true;
    } catch (error) {
      return false;
    }
  }

  async findAll() {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (error) {
      return false;
    }
  }

  async findOne(id: number) {
    try {
      const user =
        (await this.usersRepository.findOne({ where: { id } })) || false;
      if (!user) return false;
      return user;
    } catch (error) {
      return false;
    }
  }

  async findOneByEmail(email: string) {
    try {
      const user =
        (await this.usersRepository.findOne({ where: { email } })) || false;
      if (!user) return false;
      return user;
    } catch (error) {
      return false;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const res = await this.usersRepository.update(id, updateUserDto);
      if (res.affected === 0) return false;
      return true;
    } catch (error) {
      return false;
    }
  }

  async remove(id: number) {
    try {
      const res = await this.usersRepository.delete(id);
      if (res.affected === 0) return false;
      return true;
    } catch (error) {
      return false;
    }
  }
}
