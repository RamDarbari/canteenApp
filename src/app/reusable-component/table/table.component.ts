import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { PageEvent } from '@angular/material/paginator';
import { Subject, Subscription, debounceTime } from 'rxjs';
import { Order, OrderHistory } from 'src/data';
import { PendingOrdersService } from 'src/app/services/pending-orders.service';
import { ClipboardService } from 'ngx-clipboard';
import {
  NgbModal,
  NgbModalRef,
  NgbOffcanvas,
} from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';

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
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() orderHistory: boolean = false;
  @Input() pendingOrder: boolean = false;
  orderHistoryData: OrderHistory[] = [];
  orders: Order[] = [];
  pagedEmployeeData: Order[] = [];
  totalItemsOrderHistory: number;
  currentPageOrderHistory: number = 0;
  pageSizeOrderHistory: number = 10;
  pageSizeOptionsOrderHistory: number[] = [5, 10, 25, 100];
  totalItemsPendingOrder: number;
  currentPagePendingOrder: number = 0;
  pageSizePendingOrder: number = 10;
  pageSizeOptionsPendingOrder: number[] = [5, 10, 25, 100];
  searchName: string = '';
  private searchNameSubject = new Subject<string>();
  private refreshInterval: any;
  private orderSubscription: Subscription;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  limit: number = this.pageSizeOrderHistory;
  isLoadingOrderHistory: boolean = false;
  isLoading: boolean = false;
  @ViewChild('dateRangeModal') dateRangeModal: TemplateRef<any>;
  download: string = '';
  dateInterval: string = '';
  displayedColumns: string[] = [
    'date',
    '_id',
    'emp_id',
    'fullName',
    'order_status',
    'totalBalance',
  ];
  displayedColumnsPendingOrders: string[] = [
    '_id',
    'emp_id',
    'fullName',
    'totalBalance',
    'date',
    'itemName',
    'price',
    'actions',
  ];
  formB: FormGroup;
  formData: any[] = [];
  private modalRef: NgbModalRef;
  startDate: string = '';
  endDate: string = '';

  constructor(
    private http: AdminService,
    private formBuilder: FormBuilder,
    private orderService: PendingOrdersService,
    private toastr: ToastrService,
    private clipboardService: ClipboardService,
    private offcanvasService: NgbOffcanvas,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.searchNameSubject.pipe(debounceTime(500)).subscribe(() => {
      this.getOrderHistory();
    });
    this.getOrderHistory();

    this.formB = this.formBuilder.group({
      startDate: [null], // Initialize with null or a default date
      endDate: [null], // Initialize with null or a default date
    });

    this.orderSubscription = this.orderService.orders$.subscribe((orders) => {
      this.orders = orders;
      this.updatePagedData();
    });
    this.pendingOrderList();
    this.refreshInterval = setInterval(() => {
      this.pendingOrderList();
    }, 30 * 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.refreshInterval);
    this.orderSubscription.unsubscribe();
  }

  searchDebounced() {
    this.searchNameSubject.next('');
  }

  onSelectChange(event: any): void {
    const selectedValue = event.target.value;
    console.log('Selected value:', selectedValue);
    this.searchName = selectedValue;
    this.getOrderHistory();
  }

  getOrderHistory() {
    this.isLoadingOrderHistory = true;
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    const startIndex = this.currentPageOrderHistory * this.limit + 1;
    this.http
      .getOrderHistory(
        token,
        this.currentPageOrderHistory,
        this.searchName,
        this.limit,
        this.download,
        this.dateInterval
      )
      .subscribe(
        (response: any) => {
          this.orderHistoryData = response.data as OrderHistory[];
          this.totalItemsOrderHistory = response.totalRecords;
          console.log(response);
        },
        (error) => {
          console.error('Error fetching order history:', error);
        }
      )
      .add(() => {
        this.isLoadingOrderHistory = false;
      });
  }

  openDateRangeModal() {
    // Open the date range modal
    this.modalRef = this.modalService.open(this.dateRangeModal, {
      centered: true,
    });
  }

  onDateRangeSubmit() {
    // Close the modal
    this.modalRef.close();

    // Get the form values and format them
    const formattedStartDate = this.formatDate(this.startDate);
    const formattedEndDate = this.formatDate(this.endDate);

    // Log or perform actions with the formatted dates
    console.log('Formatted Start Date:', formattedStartDate);
    console.log('Formatted End Date:', formattedEndDate);

    // Call the function to fetch data with the formatted date range
    this.getOrderHistoryWithDateRange(formattedStartDate, formattedEndDate);
  }

  formatDate(date: string): string {
    // Assuming the input date is in the format "YYYY-MM-DD"
    const parts = date.split('-');
    const formattedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
    return formattedDate;
  }

  getOrderHistoryWithDateRange(startDate: string, endDate: string) {
    try {
      this.isLoadingOrderHistory = true;

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      const dateInterval = `${startDate} to ${endDate}`;

      this.http
        .getOrderHistory(
          token,
          this.currentPageOrderHistory,
          this.searchName,
          this.pageSizeOrderHistory,
          'excel',
          dateInterval
        )
        .subscribe(
          (response: any) => {
            // Call the function to download the Excel file
            this.downloadExcel(response, `OrderHistory_${dateInterval}`);
          },
          (error) => {
            console.error('Error fetching order history:', error);
          }
        )
        .add(() => {
          this.isLoadingOrderHistory = false;
        });
    } catch (error) {
      console.log(error);
    }
  }

  downloadExcel(data: any, filename: string) {
    try {
      // Assuming the data received is in the correct format for Excel (adjust as needed)
      const jsonData = JSON.stringify(data);

      // Create a Blob from the data
      const blob = new Blob([jsonData], {
        type: 'application/json',
      });

      // Trigger a file download using FileSaver.js
      saveAs(blob, `${filename}.json`);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  pagesChangedOrderHistory(event: PageEvent) {
    this.currentPageOrderHistory = event.pageIndex;
    this.limit = event.pageSize; // Set the limit to the new page size
    this.getOrderHistory();
  }

  pendingOrderList() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      const currentPage = this.currentPagePendingOrder + 0;
      const totalRecords = this.totalItemsPendingOrder || 0;
      const totalPages = Math.ceil(totalRecords / this.pageSizePendingOrder);
      const limit = this.pageSizePendingOrder;

      this.http
        .orderList(token, currentPage, totalRecords, totalPages, limit)
        .subscribe((response: any) => {
          console.log(response, 'kkkkkkkkkkkkkkkkkkkkkkkkkk');
          if (response && response.data && response.data.length > 0) {
            this.orderService.setOrders(response.data);
          }
          this.totalItemsPendingOrder = response.totalRecords;
        });
    } catch (error) {
      console.log(error);
    }
  }

  pageChangedPendingOrder(event: PageEvent) {
    console.log('Page changed:', event);
    this.currentPagePendingOrder = event.pageIndex;
    this.pageSizePendingOrder = event.pageSize;
    this.pendingOrderList();
  }

  updatePagedData() {
    const startIndex = this.currentPageOrderHistory * this.pageSizeOrderHistory;
    this.pagedEmployeeData = this.orders.slice(
      startIndex,
      startIndex + this.pageSizeOrderHistory
    );
  }

  changeOrderStatus(order_id: string, status: string) {
    try {
      this.isLoading = true; // Set loading to true when the request starts

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      this.http.orderStatus(token, status, order_id).subscribe(
        (response) => {
          console.log(response, ';;;;;;;');
          this.orders = this.orders.filter((order) => order._id !== order_id);
          this.orderService.updateOrders(this.orders);
          this.toastr.info('Order Status Has Been Updated');
        },
        (error) => {
          console.error(error);
          this.toastr.error('Error updating order status. Please try again.');
        },
        () => {
          this.isLoading = false;
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  getItemNames(order: Order): string[] {
    return order.order_rec.map((record) => record.item_name);
  }

  getQuantities(order: Order): number[] {
    return order.order_rec.map((record) => record.quantity);
  }

  getPrices(order: Order): number[] {
    return order.order_rec.map((record) => record.price);
  }

  copyOrderId(orderId: string): void {
    this.clipboardService.copyFromContent(orderId);
    this.toastr.success('Order ID copied to clipboard');
  }
}
