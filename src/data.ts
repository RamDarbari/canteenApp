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
  pendingOrder: number;
  total_orders: number;
  today_menu_items: number;
  total_users: number;
}

export interface MenuItem {
  id: string;
  menuName: string;
  // menu_id: string;
  subMenuItems: { id: string; menuName: string; itemName: string }[];
}

export interface UserData {
  emp_id: number;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
}
