import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  ParseIntPipe,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
// import { CreateInvoiceDto } from './dto/create-invoice.dto';
// import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Response } from 'express';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const invoices = await this.invoiceService.findAll();
      if (!invoices) return new Error('Get invoices failed');
      res.header('X-Total-Count', invoices.length.toString());
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(invoices);
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string, @Res() res: Response) {
    try {
      const invoice = await this.invoiceService.findOne(+id);
      if (!invoice) return new Error('Invoice not found');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(invoice);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('/user/:id')
  async findOneByUserId(
    @Param('id', ParseIntPipe) id: string,
    @Res() res: Response,
  ) {
    try {
      const invoice = await this.invoiceService.findOneByUserId(+id);
      if (!invoice) return new Error('Invoice not found');
      res.header('X-Total-Count', '1');
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      return res.json(invoice);
    } catch (error) {
      console.log(error);
    }
  }
}
