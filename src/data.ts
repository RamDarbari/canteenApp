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
  items: [];
}

export interface OrderDataItem {
  item_name: string;
  quantity: string; // or number, depending on the API requirement
  price: string; // or number, depending on the API requirement
}

export interface OrderData {
  order_rec: OrderDataItem[];
}
