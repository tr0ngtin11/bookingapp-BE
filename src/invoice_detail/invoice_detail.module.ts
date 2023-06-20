import { Module } from '@nestjs/common';
import { InvoiceDetailService } from './invoice_detail.service';
import { InvoiceDetailController } from './invoice_detail.controller';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceDetail]), UsersModule],
  controllers: [InvoiceDetailController],
  providers: [InvoiceDetailService],
})
export class InvoiceDetailModule {}
