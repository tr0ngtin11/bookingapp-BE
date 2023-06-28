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
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'invoice manager', 'room manager')
  @Get()
  async findAll(
    // @Query('limit') limit: number,
    // @Query('perPage') perPage: number,
    @Res() res: Response,
  ): Promise<Response> {
    const invoices = await this.invoiceService.findAll();
    const invoices_length = Array.isArray(invoices) ? invoices.length : 0;
    if (!invoices) return res.json('Get invoices failed');
    res.header('X-Total-Count', invoices_length.toString());
    res.header('Access-Control-Expose-Headers', 'X-Total-Count');
    // const totalPage = Math.ceil(invoices_length / limit);
    // const start = (perPage - 1) * limit ? (perPage - 1) * limit : 0;
    // const end = limit ? (perPage - start) * limit : invoices_length;
    // if (invoices_length != 0 && typeof invoices !== 'boolean') {
    //   const listInvoices = invoices.slice(start, end);
    //   return res.json({
    //     invoices: listInvoices,
    //     totalPage,
    //     currentPage: perPage,
    //   });
    // }
    return res.json(invoices);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'invoice manager', 'room manager')
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const invoice = await this.invoiceService.findOne(+id);
    if (!invoice) return res.json('Invoice not found');
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
  ): Promise<Response> {
    const invoice = await this.invoiceService.findOneByUserId(+id);
    if (!invoice) return res.json('Invoice not found');
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
  ): Promise<Response> {
    const payment = await this.invoiceService.create(createPaymentDto);
    if (!payment) return res.json('Create payment failed');
    return res.json({
      message: 'Create payment successfully',
    });
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(
    @Param('id', ParseIntPipe) id: string,
    @Res() res: Response,
  ): Promise<Response> {
    const invoice = await this.invoiceService.remove(+id);
    if (!invoice) return res.json('Delete invoice failed');
    return res.json({
      message: 'Delete invoice successfully',
    });
  }
}
