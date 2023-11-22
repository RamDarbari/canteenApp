import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { OrderHistory } from 'src/data';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryData: OrderHistory[] = [];
  totalItems: number;
  currentPage: number = 1;
  pageSize: number = 10;
  searchName: string = '';
  private searchNameSubject = new Subject<string>();

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
    this.http
      .getOrderHistory(token, this.currentPage, this.searchName)
      .subscribe((response: any) => {
        this.orderHistoryData = response.data as OrderHistory[];
        this.totalItems = response.totalRecords;
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex + 1;
    this.getOrderHistory();
  }
}
