import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Invoice } from './Invoice';
import { Room } from './Room';

@Entity({ name: 'invoice_detail' })
export class InvoiceDetail {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.id)
  invoice: number;

  @ManyToOne(() => Room, (room) => room.id)
  room: number;

  @Column()
  price: string;
}
