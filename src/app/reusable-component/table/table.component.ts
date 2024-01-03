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
import { CommonServiceService } from 'src/app/services/common-service.service';

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
    private _http: CommonServiceService,
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
    // this.getUserOrder();

    this.formB = this.formBuilder.group({
      startDate: [null],
      endDate: [null],
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
      this.searchName = empIdFromQueryParam || this.searchName;
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
    this.isLoadingOrderHistory = true;
    const empIdFromQueryParam = this.route.snapshot.queryParamMap.get('empId');
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

          // Display the error message in the toastr
          this.toastr.error(
            error.error.message || 'Failed to fetch order history.'
          );
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

  onExcelOptionChange(event: any): void {
    const selectedValue = event.target.value;
    console.log('Selected Excel Option:', selectedValue);

    // Call your API or perform actions based on the selected option
    this.downloadData(selectedValue);
  }

  onDateRangeSubmit() {
    this.modalRef.close();
    const formattedStartDate = this.formatDate(new Date(this.startDate));
    const formattedEndDate = this.formatDate(new Date(this.endDate));
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

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}-${day}-${year}`;
  }

  getOrderHistoryWithDateRange(startDate: string, endDate: string) {
    console.log('getOrderHistoryWithDateRange');
    try {
      this.isLoadingOrderHistory = true;

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      const dateInterval = `${startDate}to${endDate}`;

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
            this.toastr.error(
              error.error.message ||
                'No items found matching the search criteria.'
            );
          }
        )
        .add(() => {
          this.isLoadingOrderHistory = false;
        });
    } catch (error) {
      console.log(error);
    }
  }

  downloadData(option: string) {
    const currentDate = new Date();
    const endDate = this.formatDate(currentDate);
    let startDate = '';

    if (option === 'weekly') {
      const sevenDaysAgo = new Date(currentDate);
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      startDate = this.formatDate(sevenDaysAgo);
    } else if (option === 'monthly') {
      const thirtyDaysAgo = new Date(currentDate);
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);
      startDate = this.formatDate(thirtyDaysAgo);
    }

    this.getOrderHistoryWithDateRange(startDate, endDate);
  }

  downloadExcel(data: any, filename: string) {
    try {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      saveAs(blob, `${filename}.xlsx`);
    } catch (error) {
      console.error('Error downloading file:', error);
      this.toastr.error(error.error.message);
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
        .pendingOrderList(token, currentPage, totalRecords, totalPages, limit)
        .subscribe((response: any) => {
          console.log(response, '');
          if (response && response.data && response.data.length > 0) {
            this.orderService.setOrders(response.data);
          }
          this.totalItemsPendingOrder = response.totalRecords;
        });
    } catch (error) {
      console.log(error);
      this.toastr.error(error.error.message);
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

      this.http
        .orderStatus(token, status, order_id)
        .subscribe(
          (response) => {
            console.log(response, ';;;;;;;');
            this.orders = this.orders.filter((order) => order._id !== order_id);
            this.orderService.updateOrders(this.orders);
            this.toastr.info('Order Status Has Been Updated');
          },
          (error) => {
            console.error(error);
            this.toastr.error('Error updating order status. Please try again.');
          }
        )
        .add(() => {
          this.isLoading = false;
        });
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

  // getUserOrder() {
  //   const token = localStorage.getItem('user')
  //     ? JSON.parse(localStorage.getItem('user')).data.token
  //     : '';

  //   try {
  //     this._http.userOrder(token).subscribe((responce) => {
  //       if (responce) {
  //         console.log(responce, 'okkkkkkkkkkkkkk');
  //       }
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
