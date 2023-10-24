export interface login {
  emp_id: number;
  otp: string;
}
export interface data {
  category: string;
  emp_id: string;
  password: string;
  _id: string;
  title: string;
  time: string;
  items: [];
}

export interface OrderDataItem {
  item_name: string;
  quantity: string;
  price: string;
}

export interface OrderData {
  order_rec: OrderDataItem[];
}
