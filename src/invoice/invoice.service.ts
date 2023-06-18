import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
  ) {}

  async findAll() {
    try {
      const invoices = await this.invoiceRepository.find({
        relations: ['user'],
      });
      return invoices;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async findOneByUserId(id: number) {
    try {
      const invoices = await this.invoiceRepository.find({
        relations: ['user'],
      });

      let list_invoice = [];

      invoices.forEach((invoice) => {
        const user = invoice.user;
        const user_ob = { ...(user as Object) };
        const user_id = user_ob['id'];
        if (user_id === id) {
          list_invoice.push(invoice);
        }
      });
      return list_invoice;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  findOne(id: number) {
    const invoice = this.invoiceRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    return invoice;
  }
}
