import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { OrderHistory } from 'src/data';
import { Selection } from '../../../../selection';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent implements OnInit {
  orderHistoryData: OrderHistory[];
  selection = new Selection<OrderHistory>();

  displayedColumns: string[] = [
    'select',
    'orderId',
    'employeeId',
    'orderStatus',
    'billStatus',
    'itemName',
    'quantity',
    'totalPrice',
    'totalBalance',
    'date',
    'time',
  ];

  constructor(private http: AdminService) {}

  ngOnInit(): void {
    this.orderHistory();
  }

  orderHistory() {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    this.http.getOrderHistory(token).subscribe((response: any) => {
      this.orderHistoryData = response.data as OrderHistory[]; // Assign the data with the correct type
    });
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.orderHistoryData.forEach((row) => {
        if (!this.selection.isSelected(row)) {
          this.selection.select(row);
        }
      });
    }
  }

  hasValue(): boolean {
    return this.selection.selected.length > 0;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.orderHistoryData.length;
    return numSelected === numRows;
  }

  itemNameTemplate(row: OrderHistory): string {
    let itemNameTemplate = '';
    for (const record of row.order_rec) {
      itemNameTemplate += `<li>${record.item_name}</li>`;
    }
    return itemNameTemplate;
  }

  quantityTemplate(row: OrderHistory): string {
    let quantityTemplate = '';
    for (const record of row.order_rec) {
      quantityTemplate += `<li>${record.quantity}</li>`;
    }
    return quantityTemplate;
  }

  totalPriceTemplate(row: OrderHistory): string {
    let totalPriceTemplate = '';
    for (const record of row.order_rec) {
      totalPriceTemplate += `<li>${record.price}</li>`;
    }
    return totalPriceTemplate;
  }
}
