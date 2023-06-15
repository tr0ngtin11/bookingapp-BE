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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const { confirmPassword, ...detailUser } = createUserDto;
      const user = this.usersService.create(detailUser);
      if (!user) return new Error('Create user failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Create user successfully',
      });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const users = await this.usersService.findAll();
      if (!users) return new Error('Get users failed');
      res.header('X-Total-Count', users.length.toString());
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(users);
    } catch (error) {
      console.log(error);
    }
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    try {
      const user = await this.usersService.findOne(id);
      if (!user) return new Error('User not found');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(user);
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(AuthGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    try {
      const response = this.usersService.update(+id, updateUserDto);
      if (!response) return new Error('Update user failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Update user successfully',
      });
    } catch (error) {
      console.log(error);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    try {
      const response = this.usersService.remove(+id);
      if (!response) return new Error('Delete user failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Delete user successfully',
      });
    } catch (error) {
      console.log(error);
    }
  }
}
