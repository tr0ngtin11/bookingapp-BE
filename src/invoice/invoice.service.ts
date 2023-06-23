import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingStatus } from 'src/typeorm/entities/BookingStatus';
import { Invoice } from 'src/typeorm/entities/Invoice';
import { InvoiceDetail } from 'src/typeorm/entities/InvoiceDetail';
import { Room } from 'src/typeorm/entities/Room';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from './dto/create-payments-dto';
import { Invoice_custom } from 'src/interface/interface';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Room)
    private roomsRepository: Repository<Room>,
    @InjectRepository(Invoice)
    private invoiceRepository: Repository<Invoice>,
    @InjectRepository(InvoiceDetail)
    private invoiceDetailRepository: Repository<InvoiceDetail>,
    @InjectRepository(BookingStatus)
    private bookingStatusRepository: Repository<BookingStatus>,
  ) {}

  async findAll(): Promise<Invoice_custom[] | boolean> {
    try {
      const invoices = await this.invoiceRepository.find({
        relations: ['user'],
      });
      const invoices_custom: Invoice_custom[] = [];
      if (Array.isArray(invoices)) {
        await Promise.all(
          invoices.map(async (invoice) => {
            const id = invoice.id;
            const bookingStatus = await this.bookingStatusRepository.find({
              loadRelationIds: {
                relations: ['invoice'],
              },
            });
            const e = bookingStatus.find((e) => e.invoice === id);
            invoices_custom.push({
              ...invoice,
              status: e?.status,
            });
          }),
        );
      }
      if (!invoices_custom) return false;

      return invoices_custom;
    } catch (error) {
      return false;
    }
  }
  async findOneByUserId(id: number): Promise<Invoice[] | boolean> {
    try {
      const invoices = await this.invoiceRepository.find({
        loadRelationIds: {
          relations: ['user'],
        },
      });

      const list_invoice: Invoice[] = invoices.filter(
        (invoice) => invoice.user === id,
      );

      return list_invoice;
    } catch (error) {
      return false;
    }
  }

  async create(paymentInfor: CreatePaymentDto): Promise<boolean> {
    try {
      const list_room = paymentInfor.room;
      let total_input = 0;
      list_room.forEach(async (detail) => {
        const room = await this.roomsRepository.findOneBy({
          id: detail.roomId,
        });
        if (room) {
          total_input += parseInt(room.price);
          room.status = 'unavailable';
          this.roomsRepository.save(room);
        }
      });
      const user = await this.usersRepository.findOneBy({
        sdt: paymentInfor.sdt,
      });
      const invoice_input: Invoice = {
        user: user.id,
        total_price: total_input.toString(),
      };
      const invoice = this.invoiceRepository.create(invoice_input);
      await this.invoiceRepository.save(invoice);
      const booking = this.bookingStatusRepository.create({
        user: user.id,
        invoice: invoice.id,
      });
      await this.bookingStatusRepository.save(booking);
      paymentInfor.room.forEach(async (detail) => {
        const room = await this.roomsRepository.findOneBy({
          id: detail.roomId,
        });
        if (room) {
          const invoice_dtail = this.invoiceDetailRepository.create({
            price: room.price.toString(),
          });
          invoice_dtail.room = room.id;
          invoice_dtail.invoice = invoice.id;
          await this.invoiceDetailRepository.save(invoice_dtail);
        }
      });

      return true;
    } catch (error) {
      return false;
    }
  }
  async findOne(id: number): Promise<Invoice | boolean> {
    try {
      const invoice =
        (await this.invoiceRepository.findOne({
          where: { id },
          relations: ['user'],
        })) || false;
      if (!invoice) return false;
      return invoice;
    } catch (error) {
      return false;
    }
  }

  async remove(id: number): Promise<boolean> {
    try {
      await this.invoiceDetailRepository.delete({ invoice: id });
      await this.bookingStatusRepository.delete({ invoice: id });
      const invoice = await this.invoiceRepository.delete(id);
      if (invoice.affected === 0) return false;
      return true;
    } catch (error) {
      return false;
    }
  }
}
