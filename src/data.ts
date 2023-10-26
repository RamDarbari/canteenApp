export interface login {
  emp_id: number;
  otp: string;
}
export interface OrderDataItem {
  item_name: string;
  quantity: string;
  price: string;
  // menu_id: string;
}

export interface OrderData {
  order_rec: OrderDataItem[];
}
