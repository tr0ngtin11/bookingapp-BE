import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  ParseIntPipe,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';

import { CreatePaymentDto } from 'src/invoice/dto/create-payments-dto';
import { Response } from 'express';
// import { Invoice } from 'src/typeorm/entities/Invoice';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
// import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'invoice manager')
  @Get()
  async findAll(@Res() res: Response) {
    const invoices = (await this.invoiceService.findAll()) || [];
    const invoices_length = Array.isArray(invoices) ? invoices.length : 0;
    console.log('invoices', invoices);
    if (!invoices) return new Error('Get invoices failed');
    res.header('X-Total-Count', invoices_length.toString());
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json(invoices);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'invoice manager')
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    const invoice = await this.invoiceService.findOne(+id);
    if (!invoice) return new Error('Invoice not found');
    res.header('X-Total-Count', '1');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json(invoice);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'invoice manager')
  @Get('/user/:id')
  async findOneByUserId(
    @Param('id', ParseIntPipe) id: string,
    @Res() res: Response,
  ) {
    const invoice = await this.invoiceService.findOneByUserId(+id);
    if (!invoice) return new Error('Invoice not found');
    res.header('X-Total-Count', '1');
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    return res.json(invoice);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'invoice manager')
  @Post()
  async create(
    @Body() createPaymentDto: CreatePaymentDto,
    @Res() res: Response,
  ) {
    const payment = await this.invoiceService.create(createPaymentDto);
    if (!payment) return new Error('Create payment failed');
    return res.json({
      message: 'Create payment successfully',
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    const invoice = await this.invoiceService.remove(+id);
    if (!invoice) return new Error('Delete invoice failed');
    return res.json({
      message: 'Delete invoice successfully',
    });
  }
}
