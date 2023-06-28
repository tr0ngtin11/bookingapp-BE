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
import { ScheduleModule } from '@nestjs/schedule';
import { EmailModule } from './email/email.module';
import { BullModule } from '@nestjs/bull';
import { TranscodeConsumer } from './transcode.consumer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'transcode',
    }),
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
    ScheduleModule.forRoot(),
    UsersModule,
    RoomsModule,
    AuthModule,
    PaymentModule,
    InvoiceModule,
    InvoiceDetailModule,
    BookingstatusModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, TranscodeConsumer],
})
export class AppModule {}
