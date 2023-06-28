import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Room } from './typeorm/entities/Room';
import { Invoice } from './typeorm/entities/Invoice';
import { InvoiceDetail } from './typeorm/entities/InvoiceDetail';
import { BookingStatus } from './typeorm/entities/BookingStatus';
import { PersonalToken } from './typeorm/entities/PersonalToken';
import { RoomsModule } from './rooms/rooms.module';
import { AuthModule } from './auth/auth.module';
import { PaymentModule } from './payment/payment.module';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceDetailModule } from './invoice_detail/invoice_detail.module';
import { BookingstatusModule } from './bookingstatus/bookingstatus.module';
import { MailModule } from './mail/mail.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bookingapp',
      entities: [
        User,
        Room,
        Invoice,
        InvoiceDetail,
        BookingStatus,
        PersonalToken,
      ],
      synchronize: true,
    }),
    UsersModule,
    RoomsModule,
    AuthModule,
    PaymentModule,
    InvoiceModule,
    InvoiceDetailModule,
    BookingstatusModule,
    MailModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
