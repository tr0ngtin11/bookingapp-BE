import { Module } from '@nestjs/common';
import { BookingstatusService } from './bookingstatus.service';
import { BookingstatusController } from './bookingstatus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingStatus } from 'src/typeorm/entities/BookingStatus';
import { Room } from 'src/typeorm/entities/Room';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RoomsService } from 'src/rooms/rooms.service';
import { InvoiceDetailModule } from 'src/invoice_detail/invoice_detail.module';
import { InvoiceDetailService } from 'src/invoice_detail/invoice_detail.service';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookingStatus, Room, InvoiceDetail]),
    RoomsModule,
    InvoiceDetailModule,
  ],
  controllers: [BookingstatusController],
  providers: [BookingstatusService, RoomsService, InvoiceDetailService],
})
export class BookingstatusModule {}
