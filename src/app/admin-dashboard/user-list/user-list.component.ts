import {
  Component,
  OnInit,
  ChangeDetectorRef,
  TemplateRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { PageEvent } from '@angular/material/paginator';
import { Subject, debounceTime } from 'rxjs';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from 'src/app/reusable-component/modal/modal.component';
import { Route, Router } from '@angular/router';

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
    // 'actions',
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
  @Output() userAdded = new EventEmitter<void>();
  empId: number;

  constructor(
    private http: AdminService,
    private offcanvasService: NgbOffcanvas,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchNameSubject.pipe(debounceTime(500)).subscribe(() => {
      this.loadUserData();
    });
    this.loadUserData();

    this.userAdded.subscribe(() => {
      this.loadUserData();
    });
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
            this.loadUserData();
            this.selectedEmployee = null;
            this.offcanvasService.dismiss();
            this.toastr.success('Balance Updated Successfully');
          },
          (error) => {
            console.error('Error updating user', error);
            this.toastr.error(
              error.error.message || 'Failed to update user balance.'
            );
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

    // Set isLoading to true to show the loader
    this.isLoading = true;

    const startIndex = this.currentPage;

    this.http
      .userList(token, startIndex, this.limit, this.searchName)
      .subscribe(
        (response: any) => {
          if (response && response.data) {
            this.dataSource = response.data;
            this.totalItems = response.totalPages * this.limit;
          }
        },
        (error) => {
          console.error('Error loading user data', error);
        }
      )
      .add(() => {
        // Set isLoading to false to hide the loader, whether the request succeeds or fails
        this.isLoading = false;
      });
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.limit = event.pageSize;
    this.loadUserData();
  }

  openEnd(content: TemplateRef<any>, employee: Employee) {
    this.selectedEmployee = { ...employee, wallet: '' };
    this.offcanvasService.open(content, {
      position: 'end',
      panelClass: 'details-panel',
    });
  }

  navigateToProfile(employeeId: number): void {
    // debugger;
    this.empId = employeeId;
    this.router.navigate(['/profile'], {
      queryParams: { empId: employeeId },
    });
  }

  viewProfile(employee: Employee) {
    const employeeId = employee.EmployeeId;
    this.router.navigate(['/profile'], {
      queryParams: { empId: employeeId },
    });

    this.offcanvasService.dismiss();
  }

  openCustomOrderModal(event: Event): void {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'custom-modal',
    });

    modalRef.componentInstance.modalType = 'add-user';
    modalRef.componentInstance.userAdded.subscribe(() => {
      this.userAdded.emit();
    });
  }

  onWalletInput(event: any): void {
    const inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
    const maxLength = 5;

    if (inputValue.length > maxLength) {
      this.selectedEmployee.wallet = inputValue.slice(0, maxLength);
    }
  }
}
