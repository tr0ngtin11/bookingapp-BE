import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'invoice' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: number;

  @Column()
  total_price: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  invoice_date?: Date;
}
