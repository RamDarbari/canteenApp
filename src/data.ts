export interface login {
  emp_id: number;
  otp: string;
}
export interface OrderDataItem {
  itemId: string;
  quantity: string;
  price: string;
}

export interface OrderData {
  order_rec: OrderDataItem[];
  bill_status: string;
}
