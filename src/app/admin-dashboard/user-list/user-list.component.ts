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
    debugger;
    this.loadUserData();
  }

  loadUserData() {
    // const pages = page;
    debugger;
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    this.http
      .userList(token, this.currentPage, this.searchName)
      .subscribe((response: any) => {
        console.log('res', response);
        if (response && response.data) {
          this.pagedEmployeeData = response.data;
          this.totalItems = response.totalPages * this.pageSize;
          console.log('pagedEmployeeData', this.pagedEmployeeData);
          // this.updatePagedData();
          // this.cdr.detectChanges();
        }
      });
  }

  // updatePagedData() {
  //   debugger;
  //   const startIndex = this.currentPage * this.pageSize;
  //   this.pagedEmployeeData = this.employeeData.slice(
  //     startIndex,
  //     startIndex + this.pageSize
  //   );
  //   this.cdr.detectChanges();
  // }

  pageChanged(event: PageEvent) {
    debugger;
    // this.currentPage = this.currentPage + 1;
    this.currentPage = event.pageIndex + 1;
    this.loadUserData();
    // this.updatePagedData();
  }
  searchDebounced(): void {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    this.http
      .userList(token, 0, this.searchName)
      .pipe(debounceTime(200))
      .subscribe((response: any) => {
        if (response && response.data) {
          this.employeeData = response.data;
          this.totalItems = response.totalPages * this.pageSize;
          // this.updatePagedData();
          // this.cdr.detectChanges();
        }
      });
  }
}
