import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { OrderHistory, OrderItem } from 'src/data';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryData: OrderHistory[] = [];
  totalItems: number;
  currentPage: number = 0;
  pageSize: number = 10;
  searchName: string = '';
  private searchNameSubject = new Subject<string>();
  pageSizeOptions: number[] = [5, 10, 25, 100];
  limit: number = this.pageSize;
  displayedColumns: string[] = [
    '_id',
    'emp_id',
    'order_status',
    'bill_status',
    'totalBalance',
    'date',
    'time',
    'actions',
  ];

  constructor(private http: AdminService) {}

  ngOnInit(): void {
    this.searchNameSubject.pipe(debounceTime(500)).subscribe(() => {
      this.getOrderHistory();
    });

    this.getOrderHistory();
  }

  searchDebounced() {
    this.searchNameSubject.next('');
  }

  getOrderHistory() {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    const startIndex = this.currentPage * this.limit + 1;
    this.http
      .getOrderHistory(token, this.currentPage, this.searchName, this.limit)
      .subscribe((response: any) => {
        this.orderHistoryData = response.data as OrderHistory[];
        this.totalItems = response.totalRecords * this.limit;
      });
  }
  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.limit = event.pageSize;
    this.getOrderHistory();
  }
}
