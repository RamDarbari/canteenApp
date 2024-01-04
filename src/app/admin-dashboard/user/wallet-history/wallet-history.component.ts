import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

interface WalletHistory {
  _id: string;
  emp_id: number;
  fullName: string;
  previousBalance: number;
  priviousWallet: number;
  payment: number;
  updatedBalance: number;
  updatedWallet: number;
  date: string;
  time: string;
}

@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.scss'],
})
export class WalletHistoryComponent implements OnInit {
  walletHistoryData: WalletHistory[] = [];
  dataSource: MatTableDataSource<WalletHistory>;
  displayedColumns: string[] = ['payment', 'updatedWallet', 'date', 'time'];
  wallet: WalletHistory[] = [];
  employeeId: number = 0;

  totalRecords: number = 0;
  limit: number = 10;
  currentPage: number = 0;

  constructor(private http: AdminService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    const empId = this.getEmpIdFromQueryParam();

    if (empId !== null && empId !== undefined) {
      this.employeeWaletDetails(token, empId, this.currentPage, this.limit);
    } else {
      this.employeeWaletDetails(token, undefined, this.currentPage, this.limit);
    }
  }

  private getEmpIdFromQueryParam(): number {
    const queryParams = new URLSearchParams(window.location.search);
    const empId = queryParams.get('empId');
    return empId ? +empId : null;
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.limit = event.pageSize;
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    const empId = this.getEmpIdFromQueryParam();
    this.employeeWaletDetails(token, empId, this.currentPage, this.limit); // Pass the updated limit value
  }

  employeeWaletDetails(
    token: string,
    empId?: number,
    currentPage?: number,
    limit?: number
  ) {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.http
        .employeeWaletDetails(token, empId, currentPage, limit)
        .subscribe((response: any) => {
          this.wallet = response.data as WalletHistory[];
          this.dataSource = new MatTableDataSource(this.wallet);
        });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
