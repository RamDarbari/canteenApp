import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatPaginator } from '@angular/material/paginator';

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
  pageSize: number = 10; // Change this to your preferred page size

  constructor(private http: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    this.http.userList(token).subscribe((response: any) => {
      if (response && response.data) {
        this.employeeData = response.data;
        this.totalItems = this.employeeData.length;
        this.updatePagedData();
      }
    });
  }

  updatePagedData() {
    const startIndex = this.currentPage * this.pageSize;
    this.pagedEmployeeData = this.employeeData.slice(
      startIndex,
      startIndex + this.pageSize
    );
    this.cdr.detectChanges();
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.updatePagedData();
  }
}
