import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

import { CreatePaymentDto } from 'src/invoice/dto/create-payments-dto';
import { Response } from 'express';
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findOne(+id);
  }
  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto, @Res() res: Response) {
    const payment = this.invoiceService.create(createPaymentDto);
    if (!payment) return new Error('Create payment failed');
    const stringResult = 'Create payment successfully';
    return res.json({
      message: 'Create payment successfully',
    });
  }
}
