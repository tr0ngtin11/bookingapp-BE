import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  sdt: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  role: string;
}
