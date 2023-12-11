import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import {
  DetailsCount,
  MenuRevenue,
  MostOrderItem,
  RecentPendingOrder,
} from 'src/data'; // Update with the correct import paths

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalDetailsCounts: DetailsCount = {
    pendingOrder: 0,
    total_orders: 0,
    today_menu_items: 0,
    total_users: 0,
    daily_revenue: 0,
    monthly_revenue: 0,
  };
  isLoading: boolean = false;

  mostOrderItems: MostOrderItem[] = [];
  recentOrderItems: RecentPendingOrder[] = [];
  menuRevenueData: MenuRevenue[] = [];

  constructor(private http: AdminService) {}

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

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0];
    this.totalItemsCount(currentDate);
  }

  totalItemsCount(currentDate: string) {
    this.isLoading = true;
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    this.http.detailsCount(token, currentDate).subscribe(
      (response: any) => {
        console.log('count', response);
        if (response && response.data) {
          this.totalDetailsCounts = response.data;
          this.menuRevenueData = response.data.menu_revenue;
          this.barChartLabels = this.menuRevenueData.map((menu) => menu.title);
          this.barChartData[0].data = this.menuRevenueData.map(
            (menu) => menu.total_revenue
          );
          this.barChartData[1].data = this.menuRevenueData.map(
            (menu) => menu.count_orders
          );
          this.mostOrderItems = response.data.mostOrderItem;
          this.recentOrderItems = response.data.recent_pending_orders;
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
}
