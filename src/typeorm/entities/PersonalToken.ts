import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity({ name: 'personal_token' })
export class PersonalToken {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  token: string;

  @Column({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP',
  })
  create_at: string;

  @Column({
    type: 'date',
  })
  expire_at: string;
}
