import { Injectable } from '@nestjs/common';
import { UpdateBookingstatusDto } from './dto/update-bookingstatus.dto';
import { BookingStatus } from 'src/typeorm/entities/BookingStatus';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/typeorm/entities/Room';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';

@Injectable()
export class BookingstatusService {
  constructor(
    @InjectRepository(BookingStatus)
    private bookingstatusRepository: Repository<BookingStatus>,
    @InjectRepository(Room)
    private roomstatusRepository: Repository<Room>,
    @InjectRepository(InvoiceDetail)
    private detailinvoicestatusRepository: Repository<InvoiceDetail>,
  ) {}

  async update(
    id: number,
    updateBookingstatusDto: UpdateBookingstatusDto,
  ): Promise<BookingStatus | boolean> {
    try {
      await this.bookingstatusRepository.update(
        { invoice: id },
        updateBookingstatusDto,
      );
      const detailList = await this.detailinvoicestatusRepository.findBy({
        invoice: id,
      });
      console.log('List details: ', detailList);
      if (detailList.length > 0) {
        detailList.map(async (detail) => {
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
        loadRelationIds: {
          relations: ['user'],
        },
      });
      console.log(bookingStatus);
      return bookingStatus;
      // const subject = 'Booking Details';
      // const text = `Thank you for choosing our hotel for your vacations!`;
      // const html = `
      // <h1>Thank you for choosing our hotel for your vacations!</h1>
      // <p>Rooms:
      // </p>
      // `;

      // await this.emailService.sendEmail(user.email, subject, text, html);

      return true;
    } catch (error) {
      return false;
    }
  }
}
