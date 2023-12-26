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
  displayedColumns: string[] = [
    '_id',
    'emp_id',
    'fullName',
    'previousBalance',
    'priviousWallet',
    'payment',
    'updatedBalance',
    'updatedWallet',
    'date',
    'time',
  ];
  wallet: WalletHistory[] = [];

  constructor(private http: AdminService) {}

  ngOnInit(): void {
    // Fetch wallet history data
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    const empId = this.getEmpIdFromQueryParam();
    if (empId) {
      this.employeeWalletDetails(token, empId);
    }
  }

  // Function to get empId from query parameter
  private getEmpIdFromQueryParam(): number {
    const queryParams = new URLSearchParams(window.location.search);
    const empId = queryParams.get('empId');
    return empId ? +empId : null; // Convert empId to number or return null
  }

  employeeWalletDetails(token: string, empId: number) {
    this.http.employeeWaletDetails(token, empId).subscribe(
      (response: any) => {
        this.wallet = response.data as WalletHistory[];
        this.dataSource = new MatTableDataSource(this.wallet);
      },
      (error) => {
        console.error('Error fetching wallet history:', error);
      }
    );
  }
}
