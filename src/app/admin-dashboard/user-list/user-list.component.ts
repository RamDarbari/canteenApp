import {
  Component,
  OnInit,
  ChangeDetectorRef,
  TemplateRef,
} from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { PageEvent } from '@angular/material/paginator';
import { Subject, debounceTime } from 'rxjs';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

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
  displayedColumns: string[] = [
    'EmployeeId',
    'FirstName',
    'LastName',
    'email',
    'balance',
    'wallet',
    'actions',
  ];
  dataSource: Employee[] = [];
  totalItems: number;
  currentPage: number = 0;
  pageSize: number = 10;
  searchName: string = '';
  selectedEmployee: Employee | null = null;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  limit: number = this.pageSize;
  isLoading: boolean = false;
  private searchNameSubject = new Subject<string>();

  constructor(
    private http: AdminService,
    private offcanvasService: NgbOffcanvas,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.searchNameSubject.pipe(debounceTime(500)).subscribe(() => {
      this.loadUserData();
    });
    this.loadUserData();
  }

  searchDebounced() {
    this.searchNameSubject.next('');
  }

  updateEmployee() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      if (!this.selectedEmployee || !this.selectedEmployee.wallet) {
        this.toastr.error('Please enter a valid wallet amount.');
        return;
      }

      const { EmployeeId, balance, wallet } = this.selectedEmployee;
      const emp_id = EmployeeId;
      const payment = parseFloat(wallet);
      const bill = 0;

      this.isLoading = true;

      this.http
        .updateBalance(token, emp_id, payment, bill)
        .subscribe(
          (response) => {
            console.log('balance updated', response);
            this.loadUserData();
            this.selectedEmployee = null;
            this.offcanvasService.dismiss();
          },
          (error) => {
            console.error('Error updating user', error);
            this.toastr.error('Failed to update user balance.');
          }
        )
        .add(() => {
          this.isLoading = false;
        });
    } catch (error) {
      console.log('Error updating user', error);
    }
  }

  loadUserData() {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    const startIndex = this.currentPage * this.limit + 1;

    this.http
      .userList(token, startIndex, this.limit, this.searchName)
      .subscribe((response: any) => {
        console.log('res', response);
        if (response && response.data) {
          this.dataSource = response.data;
          this.totalItems = response.totalPages * this.limit;
          console.log('dataSource', this.dataSource);
        }
      });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.limit = event.pageSize;
    this.loadUserData();
  }

  openEnd(content: TemplateRef<any>, employee: Employee) {
    this.selectedEmployee = { ...employee, wallet: '' }; // Initialize wallet to 0
    this.offcanvasService.open(content, { position: 'end' });
  }
}
