import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { BookingStatus } from 'src/typeorm/entities/BookingStatus';
import { User } from 'src/typeorm/entities/User';
import { Room } from 'src/typeorm/entities/Room';
import { RoomsModule } from 'src/rooms/rooms.module';
import { UsersModule } from 'src/users/users.module';
import { EmailService } from 'src/email/email.service';

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
  ],
  controllers: [PaymentController],
  providers: [PaymentService, EmailService],
})
export class PaymentModule {}
