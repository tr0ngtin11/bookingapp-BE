import { AuthService } from './auth.service';
import { Body, Controller, Res, Post } from '@nestjs/common';
import { SignInDTO } from './dto/signIn-auth.dto';
import { Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(
    @Body() signInDto: SignInDTO,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    if (typeof user === 'boolean') {
      return res.json({ message: 'Login failed' });
    }

    return res.json({
      message: 'Login successfully',
      access_token: user.access_token,
      user: user.user,
    });
  }

  @Post('signup')
  async create(
    @Body() createUserDto: CreateUserDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const salt = await bcrypt.genSalt();
      const hash = await bcrypt.hash(createUserDto.password, salt);
      const newUser = { ...createUserDto, password: hash };
      const user = this.authService.signUp(newUser);
      if (!user) return res.json('Create user failed');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json({
        message: 'Create user successfully',
      });
    } catch (error) {}
  }
}
