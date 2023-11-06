export interface login {
  emp_id: number;
  otp: string;
}
export interface OrderDataItem {
  itemId: string;
  quantity: string;
  bill_status?: string;
}

export interface OrderData {
  order_rec: OrderDataItem[];
  bill_status: string;
  emp_id: string;
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

export interface OrderHistory {
  _id: string;
  emp_id: number;
  menu_id: string;
  order_status: string;
  bill_status: string;
  order_rec: OrderItem[];
  totalBalance: number;
  date: string;
  time: string;
  __v: number;
}

export interface OrderItem {
  quantity: number;
  itemId: string;
  price: number;
  item_name: string;
  totalPrice: number;
  _id: string;
}

export interface detailsCount {
  total_revenue: number;
  daily_revenue: number;
  total_orders: number;
  today_menu_items: number;
  total_users: number;
}
