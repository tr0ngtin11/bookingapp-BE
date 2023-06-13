import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { Invoice } from './Invoice';
import { User } from './User';

@Entity({ name: 'booking_status' })
export class BookingStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Invoice, (invoice) => invoice.id)
  invoice: Invoice;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column({
    type: 'enum',
    enum: ['unconfirmed', 'confirmed'],
    default: 'unconfirmed',
  })
  status: string;
}
