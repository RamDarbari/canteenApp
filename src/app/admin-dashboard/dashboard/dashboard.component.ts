import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { detailsCount } from 'src/data';

interface mostOrderItems {
  _id: string;
  count: number;
}

interface recentOrderItems {
  item_name: string;
  quantity: number;
  price: number;
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

  mostOrderItems: mostOrderItems[] = [];
  recentOrderItems: recentOrderItems[] = [];

  constructor(private http: AdminService) {}

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in "YYYY-MM-DD" format
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
        // This block will run whether the request is successful or not
        this.isLoading = false; // Set isLoading to false after the request is completed
      }
    );
  }
}
