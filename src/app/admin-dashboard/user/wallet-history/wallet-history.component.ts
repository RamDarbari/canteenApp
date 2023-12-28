import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
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

  constructor(private http: AdminService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    const empId = this.getEmpIdFromQueryParam();
    if (empId !== null && empId !== undefined) {
      this.employeeWalletDetails(empId);
    } else {
      this.employeeWalletDetails();
    }
  }

  private getEmpIdFromQueryParam(): number {
    const queryParams = new URLSearchParams(window.location.search);
    const empId = queryParams.get('empId');
    return empId ? +empId : null;
  }

  employeeWalletDetails(empId?: number) {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.http
        .employeeWaletDetails(token, empId)
        .subscribe((response: any) => {
          this.wallet = response.data as WalletHistory[];
          this.dataSource = new MatTableDataSource(this.wallet);
          console.log(this.wallet, 'kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk');
        });
    } catch (error) {
      console.error('An error occurred:', error);
    }
  }
}
