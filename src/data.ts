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

// Create an interface for detailsCount
export interface DetailsCount {
  pendingOrder: number;
  total_orders: number;
  today_menu_items: number;
  total_users: number;
  daily_revenue?: number; // Add the optional property based on your new API response
  monthly_revenue?: number; // Add the optional property based on your new API response
}

// Create an interface for MenuRevenue
export interface MenuRevenue {
  title: string;
  total_revenue: number;
  count_orders: number;
}

// Create an interface for MostOrderItem
export interface MostOrderItem {
  item_name: string;
  price: number;
  count: number;
}

// Create an interface for RecentPendingOrder
export interface RecentPendingOrder {
  item_name: string;
  quantity: number;
  totalPrice: number;
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
