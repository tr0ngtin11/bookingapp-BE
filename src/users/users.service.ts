import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { User_I } from 'src/interface/interface';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectQueue('users') private readonly usersQueue: Queue,
  ) {}
  async create(userDetail: User_I): Promise<boolean> {
    try {
      // const newUser = await this.usersRepository.create(userDetail);
      // await this.usersRepository.save(newUser);
      await this.usersQueue.add({
        newUser: userDetail,
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async findAll(): Promise<User[] | boolean> {
    try {
      const users = await this.usersRepository.find();
      return users;
    } catch (error) {
      return false;
    }
  }

  async getUsersForAdmin(): Promise<User[]> {
    try {
      const result = await this.usersRepository.find({
        where: { role: Not('admin') },
      });

      return result;
    } catch (error) {
      throw new BadRequestException(400, 'Users Not Found');
    }
  }

  async getUsersForManager(): Promise<User[]> {
    try {
      const result = await this.usersRepository.find({
        where: { role: In(['guest']) },
      });

      return result;
    } catch (error) {
      throw new BadRequestException(400, 'Users Not Found');
    }
  }

  async findOne(id: number): Promise<User | boolean> {
    try {
      const user =
        (await this.usersRepository.findOne({ where: { id } })) || false;
      if (!user) return false;
      return user;
    } catch (error) {
      return false;
    }
  }

  async findOneByEmail(email: string): Promise<User | boolean> {
    try {
      const user =
        (await this.usersRepository.findOne({ where: { email } })) || false;
      if (!user) return false;
      return user;
    } catch (error) {
      return false;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    try {
      const res = await this.usersRepository.update(id, updateUserDto);
      if (res.affected === 0) return false;
      return true;
    } catch (error) {
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const res = await this.usersRepository.delete(id);
      if (res.affected === 0) return false;
      return true;
    } catch (error) {
      return false;
    }
  }
}
