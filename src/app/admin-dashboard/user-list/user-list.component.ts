import {
  Component,
  OnInit,
  ChangeDetectorRef,
  TemplateRef,
} from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

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
  selectedEmployee: Employee | null = null; // Variable to track the selected employee

  constructor(
    private http: AdminService,
    private cdr: ChangeDetectorRef,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  openEnd(content: TemplateRef<any>, employee: Employee) {
    this.selectedEmployee = employee; // Set the selected employee
    this.offcanvasService.open(content, { position: 'end' });
  }

  updateEmployee() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      if (this.selectedEmployee) {
        const { EmployeeId, balance, wallet } = this.selectedEmployee;
        const emp_id = EmployeeId;
        const payment = parseFloat(wallet); // Convert wallet to a number
        const bill = parseFloat(balance); // Convert balance to a number

        this.http
          .updateBalance(token, emp_id, payment, bill)
          .subscribe((response) => {
            console.log('balance updated', response);
          });
      }
    } catch (error) {
      console.log('Error updating user', error);
    }
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
      .pipe(debounceTime(300))
      .subscribe((response: any) => {
        if (response && response.data) {
          this.employeeData = response.data;
          this.currentPage = 0;
          this.loadUserData();
        }
      });
  }
}
