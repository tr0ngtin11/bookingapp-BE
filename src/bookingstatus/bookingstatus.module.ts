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
import { EmailService } from 'src/email/email.service';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { User } from 'src/typeorm/entities/User';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BookingStatus,
      Room,
      InvoiceDetail,
      Invoice,
      User,
    ]),
    RoomsModule,
    InvoiceDetailModule,
    UsersModule,
  ],
  controllers: [BookingstatusController],
  providers: [
    BookingstatusService,
    RoomsService,
    InvoiceDetailService,
    EmailService,
  ],
})
export class BookingstatusModule {}
