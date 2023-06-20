import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from '@nestjs/common';
import { InvoiceDetailService } from './invoice_detail.service';
import { CreateInvoiceDetailDto } from './dto/create-invoice_detail.dto';
import { UpdateInvoiceDetailDto } from './dto/update-invoice_detail.dto';
import { Response } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('invoice-detail')
export class InvoiceDetailController {
  constructor(private readonly invoiceDetailService: InvoiceDetailService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'invoice manager')
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const invoice = await this.invoiceDetailService.findOne(+id);
    if (!invoice) {
      return res.status(404).json({
        message: 'Invoice not found',
      });
    }
    return res.json(invoice);
  }
}
