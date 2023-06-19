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
import { SignInDTO } from './dto/signIn-auth.dto';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDTO, @Res() res: Response) {
    const user = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );
    if (!user) return new Error('Login failed');
    console.log('aaa', res);
    return res.json({
      message: 'Login successfully',
      access_token: user.access_token,
      user: user.user,
    });
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
