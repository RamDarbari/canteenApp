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
import { saveAs } from 'file-saver-es';
import { ActivatedRoute } from '@angular/router';

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
  @Input() userorderhistory: boolean = false;
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
    private modalService: NgbModal,
    private route: ActivatedRoute
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

    this.route.queryParamMap.subscribe((queryParams) => {
      const empIdFromQueryParam = queryParams.get('empId');

      // Use empId from query parameter if present, otherwise use the existing value of searchName
      this.searchName = empIdFromQueryParam || this.searchName;

      this.getOrderHistory();
    });
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
    console.log('hello');
    this.isLoadingOrderHistory = true;

    // Check if empId is present in the URL query parameters
    const empIdFromQueryParam = this.route.snapshot.queryParamMap.get('empId');

    // Use empId from query parameter if present, otherwise use the value of searchName
    this.searchName = empIdFromQueryParam || this.searchName;

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

          // Check if no items are found
          // if (this.orderHistoryData.length === 0) {
          //   this.toastr.info('No items found matching the search criteria.');
          // }

          console.log(response);
        },
        (error) => {
          console.error('Error fetching order history:', error);
          // You can also add a toastr message for the error if needed
          this.toastr.error('Failed to fetch order history.');
        }
      )
      .add(() => {
        this.isLoadingOrderHistory = false;
      });
  }

  openDateRangeModal() {
    this.modalRef = this.modalService.open(this.dateRangeModal, {
      centered: true,
      backdrop: 'static',
    });
  }

  onDateRangeSubmit() {
    this.modalRef.close();
    const formattedStartDate = this.formatDate(this.startDate);
    const formattedEndDate = this.formatDate(this.endDate);
    console.log('Formatted Start Date:', formattedStartDate);
    console.log('Formatted End Date:', formattedEndDate);
    this.getOrderHistoryWithDateRange(formattedStartDate, formattedEndDate);
  }

  getMinDate(): string {
    // Assuming you want to set the minimum date as today
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day}`;
  }

  onStartDateChange() {
    const startDate = new Date(this.startDate);
    const minEndDate = new Date(startDate);
    minEndDate.setDate(startDate.getDate() + 1);
    const year = minEndDate.getFullYear();
    const month = minEndDate.getMonth() + 1;
    const day = minEndDate.getDate();
    const formattedMinEndDate = `${year}-${
      month < 10 ? '0' + month : month
    }-${day}`;
    this.endDate = formattedMinEndDate;
  }

  formatDate(date: string): string {
    const parts = date.split('-');
    const formattedDate = `${parts[1]}-${parts[2]}-${parts[0]}`;
    return formattedDate;
  }

  getOrderHistoryWithDateRange(startDate: string, endDate: string) {
    console.log('getOrderHistoryWithDateRange');
    try {
      this.isLoadingOrderHistory = true;

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      const dateInterval = `${startDate} to ${endDate}`;

      this.http
        .getOrderHistoryExecl(
          token,
          this.currentPageOrderHistory,
          this.searchName,
          this.pageSizeOrderHistory,
          'excel',
          dateInterval
        )
        .subscribe(
          (response: any) => {
            this.downloadExcel(response, `OrderHistory_${dateInterval}`);
          },
          (error) => {
            console.error('Error fetching order history:', error);
            this.toastr.error('No items found matching the search criteria.');
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
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${filename}.xlsx`);
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
          console.log(response, '');
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
      this.isLoading = true;

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
