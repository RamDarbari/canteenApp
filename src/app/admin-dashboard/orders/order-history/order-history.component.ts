import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { OrderHistory } from 'src/data';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryData: OrderHistory[] = [];
  pagedEmployeeData: OrderHistory[] = [];
  totalItems: number;
  currentPage: number = 0;
  pageSize: number = 10;
  isLoading: boolean = false;

  constructor(private http: AdminService) {}

  ngOnInit(): void {
    this.orderHistory();
  }

  orderHistory() {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    this.http.getOrderHistory(token).subscribe((response: any) => {
      this.orderHistoryData = response.data as OrderHistory[];

      // Update the totalItems based on the length of the data
      this.totalItems = this.orderHistoryData.length;

      // Update the paged data
      this.updatePagedData();
    });
  }

  updatePagedData() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedEmployeeData = this.orderHistoryData.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }
}
