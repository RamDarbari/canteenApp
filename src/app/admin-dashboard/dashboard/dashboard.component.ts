import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { detailsCount } from 'src/data';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  totalDetailsCounts: detailsCount = {
    total_revenue: 0,
    daily_revenue: 0,
    total_orders: 0,
    today_menu_items: 0,
    total_users: 0,
  };

  constructor(private http: AdminService) {}

  ngOnInit(): void {
    const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in "YYYY-MM-DD" format
    this.totalItemsCount(currentDate);
  }
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
  };

  public barChartLabels = ['Breakfast', 'Lunch', 'Snacks'];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [{ data: [65, 59, 80], label: 'Series A' }];

  totalItemsCount(currentDate: string) {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.http.detailsCount(token, currentDate).subscribe((response: any) => {
        console.log('count', response);
        if (response && response.data) {
          this.totalDetailsCounts = response.data;
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
