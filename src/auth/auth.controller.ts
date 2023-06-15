import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Get,
  Res,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { SignInDTO } from './dto/signIn-auth.dto';
import { User_I } from 'src/interface/interface';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  signIn(@Body() signInDto: SignInDTO) {
    const res = this.authService.signIn(signInDto.email, signInDto.password);
    console.log('aaa', res);
    return res;
  }

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const user = this.authService.signUp(createUserDto);
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
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
