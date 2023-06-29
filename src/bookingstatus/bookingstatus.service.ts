import { Injectable } from '@nestjs/common';
import { UpdateBookingstatusDto } from './dto/update-bookingstatus.dto';
import { BookingStatus } from 'src/typeorm/entities/BookingStatus';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/typeorm/entities/Room';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { User } from 'src/typeorm/entities/User';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class BookingstatusService {
  constructor(
    @InjectRepository(BookingStatus)
    private bookingstatusRepository: Repository<BookingStatus>,
    @InjectRepository(Room)
    private roomstatusRepository: Repository<Room>,
    @InjectRepository(InvoiceDetail)
    private detailinvoicestatusRepository: Repository<InvoiceDetail>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async update(
    id: number,
    updateBookingstatusDto: UpdateBookingstatusDto,
  ): Promise<BookingStatus | boolean> {
    try {
      console.log('Update booking status: ', id, typeof id);
      await this.bookingstatusRepository.update(
        { invoice: id },
        updateBookingstatusDto,
      );
      const detailList = await this.detailinvoicestatusRepository.find({
        loadRelationIds: true,
      });

      const detailListFilter = detailList.filter(
        (detail) => detail.invoice === id,
      );
      if (detailListFilter.length > 0) {
        detailListFilter.map(async (detail) => {
          const room = await this.roomstatusRepository.findOneBy({
            id: detail.room,
          });
          if (!room) return;
          room.status = 'available';
          return await this.roomstatusRepository.save(room);
        });
      }
      const bookingStatus = await this.bookingstatusRepository.findOne({
        where: { invoice: id },
        loadRelationIds: true,
      });

      const guest = await this.usersRepository.findOne({
        where: { id: bookingStatus.user },
      });

      const subject = 'Booking Status';
      const text = `Thank you for choosing our hotel for your vacations! See you soon !^.^`;
      const html = `
      <h1>${text}</h1>
      
      `;

      await this.emailService.sendEmail(guest.email, subject, text, html);
      return bookingStatus;
    } catch (error) {
      return false;
    }
  }
}
