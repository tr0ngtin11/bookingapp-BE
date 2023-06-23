export interface User_I {
  name: string;
  email: string;
  password: string;
  sdt: string;
  role: string;
}

export interface Invoice_custom {
  id?: number;
  total_price: string;
  user: number;
  status: string;
  invoice_date?: Date;
}
