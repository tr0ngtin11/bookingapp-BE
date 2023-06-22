import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post('revenue')
  async revenue(@Res() res: Response) {
    const revenue = await this.paymentService.revenue();
    if (revenue === 'false') return res.json({ message: 'Get revenue failed' });
    res.header('X-Total-Count', '1');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json({
      message: 'Get revenue successfully',
      data: revenue,
    });
  }
}
