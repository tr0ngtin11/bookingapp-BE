import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Res,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import * as bcrypt from 'bcryptjs';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { User } from 'src/typeorm/entities/User';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const newUser = { ...createUserDto, password: hash };
    const user = this.usersService.create(newUser);
    if (!user) return res.json('Create user failed');
    res.header('X-Total-Count', '1');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json({
      message: 'Create user successfully',
    });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'invoice manager', 'room manager')
  @Get()
  async findAll(
    @Query('limit') limit: number,
    @Query('perPage') perPage: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const users = (await this.usersService.findAll()) as Array<User>;
      if (!users) return res.json('Get users failed');
      res.header('X-Total-Count', users.length.toString());
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');

      const totalPage = Math.ceil(users.length / limit);
      const start = (perPage - 1) * limit ? (perPage - 1) * limit : 0;
      const end = limit ? (perPage - start) * limit : users.length;
      if (users.length != 0 && typeof users !== 'boolean') {
        const listUsers = users.slice(start, end);
        return res.json({
          users: listUsers,
          totalPage,
          currentPage: perPage,
        });
      }
      return res.json(users);
    } catch (error) {}
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'invoice manager', 'room manager')
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) return res.json({ message: 'User not found' });
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(user);
    } catch (error) {
      return res.json('Get user failed');
    }
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(updateUserDto.password, salt);
      const newUser = { ...updateUserDto, password: hash };
      const response = this.usersService.update(+id, newUser);
      if (!response) return res.json('Update user failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Update user successfully',
      });
    } catch (error) {}
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const response = this.usersService.remove(+id);
      if (!response) return res.json('Delete user failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Delete user successfully',
      });
    } catch (error) {}
  }
}
