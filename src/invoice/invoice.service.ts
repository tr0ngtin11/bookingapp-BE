import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatus } from 'src/typeorm/entities/BookingStatus';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { Room } from 'src/typeorm/entities/Room';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payments-dto';
import { async, retry } from 'rxjs';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
    @InjectRepository(BookingStatus)
    private bookingStatusRepository: Repository<BookingStatus>,
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

  async create(paymentInfor: CreatePaymentDto) {
    try {
      const list_room = paymentInfor.room;
      let total_input = 0;
      list_room.forEach(async (detail, index) => {
        const room = await this.roomsRepository.findOneBy({
          id: detail.roomId,
        });
        if (room) {
          total_input += parseInt(room.price);
        }
      });
      const user = await this.usersRepository.findOneBy({
        sdt: paymentInfor.sdt,
      });
      const invoice_input: Invoice = {
        user: user.id,
        total_price: total_input.toString(),
      };
      const invoice = this.invoiceRepository.create(invoice_input);
      await this.invoiceRepository.save(invoice);
      const booking = this.bookingStatusRepository.create({
        user: user.id,
        invoice: invoice.id,
      });
      await this.bookingStatusRepository.save(booking);
      paymentInfor.room.forEach(async (detail, index) => {
        const room = await this.roomsRepository.findOneBy({
          id: detail.roomId,
        });
        if (room) {
          const invoice_dtail = this.invoiceDetailRepository.create({
            price: room.price.toString(),
          });
          invoice_dtail.room = room.id;
          invoice_dtail.invoice = invoice.id;
          await this.invoiceDetailRepository.save(invoice_dtail);
        }
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  async findOne(id: number) {
    try {
      const invoice = await this.invoiceRepository.findOne({
        where: { id },
        relations: ['user'],
      });
      return invoice;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
