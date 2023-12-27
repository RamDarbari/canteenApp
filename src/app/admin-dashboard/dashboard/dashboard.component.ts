import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { PendingOrdersService } from 'src/app/services/pending-orders.service';
import { Order, detailsCount } from 'src/data';

interface mostOrderItems {
  _id: string;
  count: number;
}

interface recentOrderItems {
  _id: string;
  fullName: string;
  emp_id: number;
  order_status: string;
  bill_status: string;
  order_rec: {
    quantity: number;
    itemId: string;
    price: number;
    item_name: string;
    totalPrice: number;
    _id: string;
  }[];
  totalBalance: number;
  date: string;
  time: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalDetailsCounts: detailsCount = {
    pendingOrder: 0,
    total_orders: 0,
    today_menu_items: 0,
    total_users: 0,
  };
  isLoading: boolean = false;
  pagedEmployeeData: Order[] = [];
  mostOrderItems: mostOrderItems[] = [];
  recentOrderItems: recentOrderItems[] = [];
  orders: Order[] = [];
  displayedColumnsPendingOrders: string[] = [
    '_id',
    'emp_id',
    'fullName',
    'totalBalance',
    'date',
    'itemName',
    'price',
    'actions',
  ];

  constructor(
    private http: AdminService,
    private toastr: ToastrService,
    private clipboardService: ClipboardService,
    private orderService: PendingOrdersService
  ) {}

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.totalItemsCount(currentDate);
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    colors: ['#FF0000', '#00FF00'],
  };

  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {
      label: 'revenue',
      data: [],
    },
    {
      label: 'count-orders',
      data: [],
    },
  ];

  totalItemsCount(currentDate: string) {
    this.isLoading = true; // Set isLoading to true when making the request
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    this.http.detailsCount(token, currentDate).subscribe(
      (response: any) => {
        console.log('count', response);
        if (response && response.data) {
          this.totalDetailsCounts = response.data[0];
          const menuRevenueData = response.data.menu_revenue;
          // this.barChartLabels = menuRevenueData.map((menu) => menu.title);
          // this.barChartData[0].data = menuRevenueData.map(
          //   (menu) => menu.total_revenue
          // );
          // this.barChartData[1].data = menuRevenueData.map(
          //   (menu) => menu.count_orders
          // );
          this.mostOrderItems = response.data[0].mostOrderItem;
          console.log(this.mostOrderItems, 'llllllllllllllllllllllllllll');
          this.recentOrderItems = response.data[0].recent_pending_orders;
          console.log(this.recentOrderItems, 'oooooooooooooooooooooooooooo');
        }
      },
      (error) => {
        console.error('Error loading data:', error);
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  copyOrderId(orderId: string): void {
    this.clipboardService.copyFromContent(orderId);
    this.toastr.success('Order ID copied to clipboard');
  }

  changeOrderStatus(order_id: string, status: string) {
    try {
      this.isLoading = true;

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      this.http.orderStatus(token, status, order_id).subscribe(
        (response) => {
          console.log(response, ';;;;;;;');
          this.orders = this.orders.filter((order) => order._id !== order_id);
          this.orderService.updateOrders(this.orders);
          this.toastr.info('Order Status Has Been Updated');
          // Call totalItemsCount with the current date to update counts
          const currentDate = new Date().toISOString().split('T')[0];
          this.totalItemsCount(currentDate);
        },
        (error) => {
          console.error(error);
          this.toastr.error('Error updating order status. Please try again.');
        },
        () => {
          this.isLoading = false;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
