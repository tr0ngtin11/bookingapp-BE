import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { Room } from 'src/typeorm/entities/Room';
import { Repository } from 'typeorm';

@Injectable()
export class InvoiceDetailService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async findOne(id: number): Promise<InvoiceDetail[] | boolean> {
    try {
      const invoices = await this.invoiceDetailRepository.find({
        relations: ['invoice', 'room'],
      });

      const list_invoice = [];

      invoices.forEach((detail) => {
        const invoice: any = detail.invoice;
        const detail_ob = { ...invoice };
        const detail_id = detail_ob['id'];
        if (detail_id === id) {
          list_invoice.push(detail);
        }
      });

      return list_invoice;
    } catch (error) {
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      const detail_list = await this.invoiceDetailRepository.findBy({
        invoice: id,
      });
      if (detail_list) {
        detail_list.forEach(async (detail) => {
          const room = await this.roomsRepository.findOneBy({
            id: detail.room,
          });
          if (room) {
            room.status = 'available';
            await this.roomsRepository.save(room);
          }
        });
      }
      const res = await this.invoiceDetailRepository.delete(id);
      if (res.affected === 0) return false;
      return true;
    } catch (error) {
      return false;
    }
  }
}
