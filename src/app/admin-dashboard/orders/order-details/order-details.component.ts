import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { Order } from 'src/data';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
})
export class OrderDetailsComponent implements OnInit {
  orders: Order[] = [];
  pagedEmployeeData: Order[] = [];
  totalItems: number;
  currentPage: number = 0;
  pageSize: number = 10;
  isLoading: boolean = false;

  constructor(private https: AdminService) {}

  ngOnInit(): void {
    this.pendingOrderList();
  }

  pendingOrderList() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      this.isLoading = true;

      this.https.orderList(token).subscribe((response: any) => {
        console.log(response, 'kkkkkkkkkkkkkkkkkkkkkkkkkk');
        if (response && response.data && response.data.length > 0) {
          this.orders = response.data;
          this.totalItems = this.orders.length;
        }
        this.isLoading = false;
        this.updatePagedData();
      });
    } catch (error) {
      console.log(error);
      this.isLoading = false;
    }
  }

  updatePagedData() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedEmployeeData = this.orders.slice(
      startIndex,
      startIndex + this.pageSize
    );
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }

  changeOrderStatus(order_id: string, status: string) {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.https.orderStatus(token, status, order_id).subscribe((response) => {
        console.log(response, ';;;;;;;');
        this.pendingOrderList();
      });
    } catch (error) {
      console.log(error);
    }
  }
}
