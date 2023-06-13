import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'rooms' })
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: string;

  @Column({
    type: 'enum',
    enum: ['normal', 'vip'],
  })
  type: string;

  @Column()
  bed_count: string;

  @Column({
    type: 'enum',
    enum: ['available', 'unavailable'],
    default: 'available',
  })
  status: string;
}
