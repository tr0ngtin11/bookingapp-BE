export class CreatePaymentDto {
  sdt: string;
  room: [
    {
      roomId: number;
      type: string;
      price: string;
    },
  ];
  total: string;
}
