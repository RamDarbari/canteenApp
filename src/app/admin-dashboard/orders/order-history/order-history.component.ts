import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { OrderHistory, OrderItem } from 'src/data';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup } from '@angular/forms';

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
  isLoading: boolean = false;
  displayedColumns: string[] = [
    '_id',
    'emp_id',
    'order_status',
    'bill_status',
    'totalBalance',
    'date',
    'time',
    // 'actions',
  ];
  formB: FormGroup;
  formData: any[] = [];

  constructor(private http: AdminService, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.searchNameSubject.pipe(debounceTime(500)).subscribe(() => {
      this.getOrderHistory();
    });

    this.getOrderHistory();

    this.formB = this.formBuilder.group({
      field1: [''],
      field2: [''],
    });
  }

  searchDebounced() {
    this.searchNameSubject.next('');
  }

  getOrderHistory() {
    this.isLoading = true;
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    const startIndex = this.currentPage * this.limit + 1;
    this.http
      .getOrderHistory(token, this.currentPage, this.searchName, this.limit)
      .subscribe(
        (response: any) => {
          this.orderHistoryData = response.data as OrderHistory[];
          this.totalItems = response.totalRecords;
        },
        (error) => {
          console.error('Error fetching order history:', error);
        }
      )
      .add(() => {
        this.isLoading = false;
      });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.limit = event.pageSize;
    this.getOrderHistory();
  }
}
