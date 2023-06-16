import { User } from 'src/typeorm/entities/User';

export class CreatePaymentDto {
  userId: number;
  room: [
    {
      roomId: number;
      type: string;
      price: string;
    },
  ];
  total: string;
}
