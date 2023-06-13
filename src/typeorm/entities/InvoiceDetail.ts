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
  id: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.id)
  invoice: Invoice;

  @OneToOne(() => Room, (room) => room.id)
  room: Room;

  @Column()
  price: string;
}
