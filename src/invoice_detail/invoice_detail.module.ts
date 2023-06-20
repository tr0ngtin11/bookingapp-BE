import { Module } from '@nestjs/common';
import { InvoiceDetailService } from './invoice_detail.service';
import { InvoiceDetailController } from './invoice_detail.controller';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/typeorm/entities/Room';
import { RoomsModule } from 'src/rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetail, Room]), RoomsModule],
  controllers: [InvoiceDetailController],
  providers: [InvoiceDetailService],
  exports: [InvoiceDetailService],
})
export class InvoiceDetailModule {}
