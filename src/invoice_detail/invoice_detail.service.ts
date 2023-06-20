import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { Room } from 'src/typeorm/entities/Room';
import { Repository } from 'typeorm';

// viết hàm tính 2 số a + b khi nhận vào 2 tham số a, b

@Injectable()
export class InvoiceDetailService {
  constructor(
    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
  ) {}

  async findOne(id: number) {
    try {
      const invoices =
        (await this.invoiceDetailRepository.find({
          relations: ['invoice', 'room'],
        })) || [];

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
      return false;
    }
  }

  async remove(id: number) {
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
