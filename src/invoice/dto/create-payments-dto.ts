export class CreatePaymentDto {
  sdt: string;
  room: [
    {
      roomId: number;
    },
  ];
  total: string;
}
