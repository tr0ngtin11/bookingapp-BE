export class CreatePaymentDto {
  userId: number;
  room: [
    {
      roomId: number;
      type: string;
      price: string;
    },
  ];
}
