import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatus } from 'src/typeorm/entities/BookingStatus';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { Room } from 'src/typeorm/entities/Room';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentService {
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

  async create(paymentInfor: CreatePaymentDto) {
    const invoice_input: Invoice = {
      user: paymentInfor.userId,
      total_price: paymentInfor.total,
    };
    const invoice = this.invoiceRepository.create(invoice_input);
    await this.invoiceRepository.save(invoice);
    const id_invoice = invoice.id;
    const booking = this.bookingStatusRepository.create({
      user: paymentInfor.userId,
      invoice: invoice.id,
    });
    await this.bookingStatusRepository.save(booking);
    paymentInfor.room.forEach(async (detail, index) => {
      const invoice_dtail = this.invoiceDetailRepository.create({
        price: detail.price,
      });
      invoice_dtail.room = parseInt(detail.roomId);
      invoice_dtail.invoice = invoice.id;
      await this.invoiceDetailRepository.save(invoice_dtail);
    });

    return true;
  }
}
