import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { PendingOrdersService } from 'src/app/services/pending-orders.service';
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
  private refreshInterval: any;
  private orderSubscription: Subscription;

  constructor(
    private https: AdminService,
    private orderService: PendingOrdersService
  ) {}

  ngOnInit(): void {
    this.orderSubscription = this.orderService.orders$.subscribe((orders) => {
      this.orders = orders;
      this.totalItems = this.orders.length;
      this.updatePagedData();
    });
    this.pendingOrderList();
    this.refreshInterval = setInterval(() => {
      this.pendingOrderList();
    }, 5 * 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
    this.orderSubscription.unsubscribe();
  }

  pendingOrderList() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.https.orderList(token).subscribe((response: any) => {
        console.log(response, 'kkkkkkkkkkkkkkkkkkkkkkkkkk');
        if (response && response.data && response.data.length > 0) {
          this.orderService.setOrders(response.data); // Update orders using the service
        }
      });
    } catch (error) {
      console.log(error);
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
      this.isLoading = true; // Set loading to true when the request starts

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      this.https.orderStatus(token, status, order_id).subscribe(
        (response) => {
          console.log(response, ';;;;;;;');
          this.orders = this.orders.filter((order) => order._id !== order_id);
          this.orderService.updateOrders(this.orders);
        },
        (error) => {
          console.error(error);
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
