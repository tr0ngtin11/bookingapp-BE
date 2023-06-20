import { Injectable } from '@nestjs/common';
import { CreateBookingstatusDto } from './dto/create-bookingstatus.dto';
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

  create(createBookingstatusDto: CreateBookingstatusDto) {
    return 'This action adds a new bookingstatus';
  }

  findAll() {
    return `This action returns all bookingstatus`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bookingstatus`;
  }

  async update(id: number, updateBookingstatusDto: UpdateBookingstatusDto) {
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
      console.log(error);
      return false;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} bookingstatus`;
  }
}
