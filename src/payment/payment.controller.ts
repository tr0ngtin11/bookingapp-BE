import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AuthGuard)
  @Post('revenue')
  async revenue(@Res() res: Response): Promise<Response> {
    const revenue = await this.paymentService.revenue();
    if (revenue === 0) return res.json({ message: 'Get revenue failed' });
    res.header('X-Total-Count', '1');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json({
      message: 'Get revenue successfully',
      data: revenue,
    });
  }
}
