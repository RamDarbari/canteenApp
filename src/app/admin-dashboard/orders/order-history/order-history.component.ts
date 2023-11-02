import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { OrderHistory } from 'src/data';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryData: OrderHistory[];

  constructor(private http: AdminService) {}

  ngOnInit(): void {
    this.orderHistory();
  }

  orderHistory() {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    this.http.getOrderHistory(token).subscribe((response: any) => {
      this.orderHistoryData = response.data as OrderHistory[]; // Assign the data with the correct type
    });
  }
}
