import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';

import { CreatePaymentDto } from 'src/invoice/dto/create-payments-dto';
import { Response } from 'express';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { AuthGuard } from 'src/auth/auth.guard';
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll(@Res() res: Response) {
    const invoices = this.invoiceService.findAll() || [];
    const invoices_length = Array.isArray(invoices) ? invoices.length : 0;
    if (!invoices) return new Error('Get invoices failed');
    res.header('X-Total-Count', invoices_length.toString());
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json(invoices);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    const invoice = this.invoiceService.findOne(+id);
    if (!invoice) return new Error('Invoice not found');
    res.header('X-Total-Count', '1');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json(invoice);
  }

  @UseGuards(AuthGuard)
  @Get('/user/:id')
  findOneByUserId(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    const invoice = this.invoiceService.findOneByUserId(+id);
    if (!invoice) return new Error('Invoice not found');
    res.header('X-Total-Count', '1');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json(invoice);
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @Res() res: Response) {
    const payment = this.invoiceService.create(createPaymentDto);
    if (!payment) return new Error('Create payment failed');
    return res.json({
      message: 'Create payment successfully',
    });
  }
}
