import { Module } from '@nestjs/common';
import { InvoiceDetailService } from './invoice_detail.service';
import { InvoiceDetailController } from './invoice_detail.controller';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { RoomsModule } from 'src/rooms/rooms.module';
import { RoomsService } from 'src/rooms/rooms.service';
import { Room } from 'src/typeorm/entities/Room';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceDetail, Room]),
    UsersModule,
    RoomsModule,
  ],
  controllers: [InvoiceDetailController],
  providers: [InvoiceDetailService, RoomsService],
  exports: [InvoiceDetailService],
})
export class InvoiceDetailModule {}
