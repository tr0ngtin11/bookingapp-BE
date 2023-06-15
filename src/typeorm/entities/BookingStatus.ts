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
  id?: number;

  @ManyToOne(() => Invoice, (invoice) => invoice.id)
  invoice: number;

  @ManyToOne(() => User, (user) => user.id)
  user: number;

  @Column({
    type: 'enum',
    enum: ['unconfirmed', 'confirmed'],
    default: 'unconfirmed',
  })
  status?: string;
}
