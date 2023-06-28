import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatus } from 'src/typeorm/entities/BookingStatus';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { Room } from 'src/typeorm/entities/Room';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';
import { Cron } from '@nestjs/schedule';

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
    private readonly emailService: EmailService,
  ) {}

  async revenue(): Promise<number> {
    try {
      let total = 0;
      const invoice_list = await this.invoiceRepository.find();
      const revenue = invoice_list.reduce((acc, cur) => {
        const curTotal = parseInt(cur.total_price);
        if (!isNaN(curTotal)) {
          total += curTotal;
        }
        return total;
      }, 0);
      return revenue;
    } catch (error) {
      return 0;
    }
  }

  @Cron('*/1 * * * *')
  async sendRevenue2Admin(): Promise<void> {
    try {
      console.log('sendRevenue2Admin');
      let total = 0;
      const invoice_list = await this.invoiceRepository.find();
      const revenue = invoice_list.reduce((acc, cur) => {
        const curTotal = parseInt(cur.total_price);
        if (!isNaN(curTotal)) {
          total += curTotal;
        }
        return total;
      }, 0);

      // lay ngay thang nam hien tai
      const currentDay = new Date();
      const subject = 'Revenue of the hotel';
      const text = `Revenue until now (${currentDay} ) is ${revenue.toLocaleString()} VND`;
      const html = `
      <h1>${text}</h1>`;

      await this.emailService.sendEmail(
        '20520811@gm.uit.edu.vn',
        subject,
        text,
        html,
      );
    } catch (error) {
      console.log(error);
    }
  }
}
