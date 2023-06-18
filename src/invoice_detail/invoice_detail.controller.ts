import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { InvoiceDetailService } from './invoice_detail.service';
import { CreateInvoiceDetailDto } from './dto/create-invoice_detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice_detail.dto';

@Controller('invoice-detail')
export class InvoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceDetailService.findOne(+id);
  }
}
