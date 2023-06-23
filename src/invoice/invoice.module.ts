import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { UsersModule } from 'src/users/users.module';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { BookingStatus } from 'src/typeorm/entities/BookingStatus';
import { User } from 'src/typeorm/entities/User';
import { Room } from 'src/typeorm/entities/Room';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      InvoiceDetail,
      BookingStatus,
      User,
      Room,
    ]),
    RoomsModule,
    UsersModule,
    BookingStatus,
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule {}
