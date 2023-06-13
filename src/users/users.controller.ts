import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { STATUS_CODES } from 'http';
import { async } from 'rxjs';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { confirmPassword, ...detailUser } = createUserDto;
    const user = this.usersService.create(detailUser);
    if (!user) return new Error('Create user failed');

    return {
      message: 'Create user successfully',
    };
  }

  @Get()
  async findAll() {
    try {
      const users = await this.usersService.findAll();
      return users;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = this.usersService.update(+id, updateUserDto);
    if (!res) return new Error('Update user failed');

    return {
      message: 'Update user successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const res = this.usersService.remove(+id);
    if (!res) return new Error('Delete user failed');
    return {
      message: 'Delete user successfully',
    };
  }
}
