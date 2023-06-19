import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceDetailService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
  ) {}

  async findOne(id: number) {
    try {
      const invoices = await this.invoiceDetailRepository.find({
        relations: ['invoice', 'room'],
      });

      let list_invoice = [];

      invoices.forEach((detail) => {
        const invoice = detail.invoice;
        const detail_ob = { ...(invoice as Object) };
        const detail_id = detail_ob['id'];
        if (detail_id === id) {
          list_invoice.push(detail);
        }
      });
      return list_invoice;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
