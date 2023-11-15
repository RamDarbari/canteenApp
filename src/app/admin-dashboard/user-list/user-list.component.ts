import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';

interface Employee {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  email: string;
  role: string;
  balance: string;
  wallet: string;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  employeeData: Employee[] = [];
  pagedEmployeeData: Employee[] = [];
  totalItems: number;
  currentPage: number = 0;
  pageSize: number = 10;
  pageEvent: PageEvent;
  searchName: string = '';

  constructor(private http: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUserData();
  }
  loadUserData() {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    // Calculate the startIndex with 1-based indexing
    const startIndex = this.currentPage + 1;

    this.http
      .userList(token, startIndex, this.searchName)
      .subscribe((response: any) => {
        console.log('res', response);
        if (response && response.data) {
          this.pagedEmployeeData = response.data;
          this.totalItems = response.totalPages * this.pageSize;
          console.log('pagedEmployeeData', this.pagedEmployeeData);
        }
      });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.loadUserData();
  }

  searchDebounced(): void {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    this.http
      .userList(token, 0, this.searchName)
      .pipe(debounceTime(500))
      .subscribe((response: any) => {
        if (response && response.data) {
          this.employeeData = response.data;
          this.currentPage = 1;
          this.loadUserData();
        }
      });
  }
}
