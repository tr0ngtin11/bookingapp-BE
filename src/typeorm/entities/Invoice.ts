import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Generated,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'invoice' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  total_price: string;

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  invoice_date: string;
}
