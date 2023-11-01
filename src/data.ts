export interface login {
  emp_id: number;
  otp: string;
}
export interface OrderDataItem {
  itemId: string;
  quantity: string;
}

export interface OrderData {
  order_rec: OrderDataItem[];
  bill_status: string;
}

export interface Order {
  _id: string;
  emp_id: number;
  menu_id: string;
  order_status: string;
  bill_status: string;
  order_rec: OrderRecord[];
  totalBalance: number;
  date: string;
  time: string;
}

export interface OrderRecord {
  quantity: number;
  itemId: string;
  item_name: string;
  price: number;
  totalPrice: number;
  _id: string;
}
