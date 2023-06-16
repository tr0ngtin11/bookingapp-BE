import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Res() res: Response,
  ) {
    const payment = await this.paymentService.create(createPaymentDto);
    if (!payment) return new Error('Create payment failed');
    return res.json({
      message: 'Create payment successfully',
    });
  }
  @Post('revenue')
  async revenue(@Res() res: Response) {
    const revenue = await this.paymentService.revenue();
    if (!revenue) return new Error('Get revenue failed');
    res.header('X-Total-Count', '1');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json({
      message: 'Get revenue successfully',
      data: revenue,
    });
  }
}
