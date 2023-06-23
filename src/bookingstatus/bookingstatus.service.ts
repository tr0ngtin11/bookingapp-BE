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
  ): Promise<boolean> {
    try {
      await this.bookingstatusRepository.update(
        { invoice: id },
        updateBookingstatusDto,
      );
      const detailList = await this.detailinvoicestatusRepository.findBy({
        invoice: id,
      });
      if (detailList.length > 0) {
        detailList.forEach(async (detail) => {
          const room = await this.roomstatusRepository.findOneBy({
            id: detail.room,
          });
          if (room) {
            room.status = 'available';
            await this.roomstatusRepository.save(room);
          }
        });
      }
      return true;
    } catch (error) {
      return false;
    }
  }
}
