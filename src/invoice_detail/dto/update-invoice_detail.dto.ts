import { PartialType } from '@nestjs/mapped-types';
import { CreateInvoiceDetailDto } from './create-invoice_detail.dto';

export class UpdateInvoiceDetailDto extends PartialType(CreateInvoiceDetailDto) {}
