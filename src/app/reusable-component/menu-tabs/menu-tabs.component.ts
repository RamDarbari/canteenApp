import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Subject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { SelectedmenusService } from 'src/app/services/selectedmenus.service';
import { OrderData, OrderDataItem } from 'src/data';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';

// import { NgxSpinnerService } from 'ngx-spinner';

interface TodayMenu {
  _id: string;
  today_menu_id: string;
  title: string;
  time: string;
  items: MenuItem[];
  createdAt: string;
  updatedAt: string;
}

interface MenuItem {
  _id: string;
  item_name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
interface cartItems {
  itemId: string;
  item_name: string;
  price: number;
  quantity: number;
  initialPrice: number;
}

interface item {
  _id: string;
}
@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.component.html',
  styleUrls: ['./menu-tabs.component.scss'],
})
export class MenuTabsComponent implements OnInit {
  isLoading: boolean = false;
  isDeleteLoading: boolean = false;
  isActive: boolean = false;
  submenu: TodayMenu[] = [];
  selectedMenus: any[] = [];
  cartItems: cartItems[] = [];
  quantity: false;
  closeResult = '';
  item: item;
  selectedCategory: string = ''; // For Today's Menu
  selectedButton: string = 'Breakfast'; // For Custom Order
  selectedBillStatus: string = '';
  @Input() todaymenu: boolean = false;
  @Input() custommenu: boolean = false;
  empId: string = '';
  selectedCategoryId: string = '';
  selectedButtonId: string = '';
  showSidebar: boolean = false;
  isBreakfastDisabled: boolean = false;
  isLunchDisabled: boolean = false;
  isSnacksDisabled: boolean = false;
  @Output() itemDeleted = new EventEmitter<void>();
  @Output() itemAdded = new EventEmitter<void>();
  @Output() listSub = new EventEmitter<void>();
  displayedColumns: string[] = ['item_name', 'price', 'quantity'];

  private selectedMenusSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  selectedMenus$ = this.selectedMenusSubject.asObservable();
  private isCategoryDisabledSubject = new BehaviorSubject<{
    [key: string]: boolean;
  }>({});
  isCategoryDisabled$ = this.isCategoryDisabledSubject.asObservable();
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private _http: AdminService,
    private toastr: ToastrService,
    private _https: CommonServiceService,
    private menuService: SelectedmenusService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private zone: NgZone,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.filterSubMenuList();
    this.fetchSelectedMenus();
    this.loadCartItems();
    const storedMenus = JSON.parse(localStorage.getItem('selectedMenus')) || {};
    this.selectedMenus = storedMenus;
    const storedTodayCategory = localStorage.getItem('selectedTodayCategory');
    this.selectedCategory = storedTodayCategory || 'Breakfast';

    const storedCustomCategory = localStorage.getItem('selectedCustomCategory');
    this.selectedButton = storedCustomCategory || 'Breakfast';
    const sidebarState = localStorage.getItem('sidebarState');
    if (sidebarState === 'open') {
      this.showSidebar = true;
    }
    this.itemDeleted.subscribe(() => {
      this.filterSubMenuList();
    });
    this.itemAdded.subscribe(() => {
      this.filterSubMenuList();
    });
    this.listSub.subscribe(() => {
      this.filterSubMenuList();
      localStorage.setItem('sidebarState', 'open');
    });
    this.updateMenuCategoryState();
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });

    this.cartService.cartItems$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((cartItems) => {
        this.zone.run(() => {
          this.cartItems = cartItems as cartItems[];
          this.updateMenuCategoryState();
        });
      });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  openSidebar() {
    this.showSidebar = true;
    localStorage.setItem('sidebarState', 'open');
  }

  closeSidebar() {
    this.showSidebar = false;
    localStorage.setItem('sidebarState', 'closed');
  }

  getTotalBalance(): number {
    let totalBalance = 0;
    if (this.cartItems) {
      this.cartItems.forEach((item) => {
        totalBalance += item.price;
      });
    }
    return totalBalance;
  }

  get hasCartItems(): boolean {
    const existingItems = localStorage.getItem('cartItems');
    return !!existingItems && JSON.parse(existingItems).length > 0;
  }

  private saveCartItems(): void {
    const cartItems = this.cartItems || [];
    this.cartService.updateCartItems(cartItems);
  }

  private loadCartItems(): void {
    this.cartItems = this.cartService.getCartItems();
    this.selectedMenus = this.cartItems;
  }

  private saveBillStatus(status: string): void {
    localStorage.setItem('selectedBillStatus', status); // Save selectedBillStatus to localStorage if needed
  }

  private loadBillStatus(): void {
    const storedStatus = localStorage.getItem('selectedBillStatus');
    if (storedStatus) {
      this.selectedBillStatus = storedStatus; // Load selectedBillStatus from localStorage
    }
  }

  private updateQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {}, // Clear the queryParams object to avoid storing category ID
      queryParamsHandling: 'merge',
    });
  }

  private updateMenuCategoryState() {
    const isCartItemsEmpty = Object.keys(this.selectedMenus).length === 0;

    const disabledState = {
      Breakfast: this.selectedCategory !== 'Breakfast' && !isCartItemsEmpty,
      Lunch: this.selectedCategory !== 'Lunch' && !isCartItemsEmpty,
      Snacks: this.selectedCategory !== 'Snacks' && !isCartItemsEmpty,
    };

    this.isCategoryDisabledSubject.next(disabledState);
  }

  getTotalPrice(): number {
    let totalPrice = 0;
    if (this.cartItems) {
      this.cartItems.forEach((item) => {
        totalPrice += item.price;
      });
    }
    return totalPrice;
  }

  updateSelectedCategory(category: string) {
    this.selectedCategory = category;
    localStorage.setItem('selectedTodayCategory', category);
    const selectedCategory = this.submenu.find(
      (meal) => meal.title.toLowerCase() === category.toLowerCase()
    );
    this.selectedCategoryId = selectedCategory ? selectedCategory._id : '';
    this.updateMenuCategoryState();
    this.updateQueryParams();
  }

  updateCustomCategory(category: string) {
    this.selectedButton = category;
    localStorage.setItem('selectedCustomCategory', category);
    const selectedButton = this.submenu.find(
      (meal) => meal.title.toLowerCase() === category.toLowerCase()
    );
    this.selectedButtonId = selectedButton ? selectedButton._id : '';
    this.updateMenuCategoryState();
    this.updateQueryParams();
  }

  filterSubMenuList() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this._http.addminMenuList(token).subscribe((response) => {
        if (response.data && response.data.length > 0) {
          this.submenu = response.data;
        } else {
          this.toastr.error('No meals found');
        }
        this.fetchSelectedMenus();
        // this.loadCartItems();
      });
    } catch (error) {
      console.error(error);
      this.toastr.error(
        'An unexpected error occurred. Please try again later.'
      );
    }
  }

  addTodayMenu(
    menuType: string,
    subMenuItems: { id: string; menuName: string; itemName: string }[]
  ) {
    try {
      const storedMenus =
        JSON.parse(localStorage.getItem('selectedMenus')) || {};

      if (!storedMenus[menuType]) {
        storedMenus[menuType] = [];
      }

      subMenuItems.forEach((subMenuItem) => {
        const { id, menuName, itemName } = subMenuItem;

        const itemExistsInSelectedMenus = this.selectedMenus.some((menu) =>
          menu.subMenuItems.some((item) => item.id === id)
        );

        if (itemExistsInSelectedMenus) {
          this.toastr.error(`${itemName} is already in the selected menus.`);
        } else {
          const itemExistsInStoredMenus = storedMenus[menuType].some(
            (item) => item.id === id
          );

          if (itemExistsInStoredMenus) {
            this.toastr.warning(`${itemName} is already existed in the menu.`);
          } else {
            storedMenus[menuType].push({ id, menuName, itemName });
            this.toastr.success(`${itemName} added to the menu successfully!`);
          }
        }
      });

      localStorage.setItem('selectedMenus', JSON.stringify(storedMenus));
      this.selectedMenus = storedMenus;
      this.menuService.updateSelectedMenus(storedMenus);
      this.fetchSelectedMenus();
      this.updateMenuCategoryState();
      console.log('Menu added to localStorage:', storedMenus);
      this.cdr.detectChanges();
    } catch (error) {
      console.error(error);
      this.toastr.error(
        'An unexpected error occurred. Please try again later.'
      );
    }
  }

  fetchSelectedMenus() {
    try {
      const storedMenus =
        JSON.parse(localStorage.getItem('selectedMenus')) || {};
      this.selectedMenus = Object.keys(storedMenus).map((menuType) => ({
        menuType,
        subMenuItems: storedMenus[menuType],
      }));
      this.updateMenuCategoryState();
      console.log(
        'Fetched selectedMenus from localStorage:',
        this.selectedMenus
      );
      this.cdr.detectChanges();
    } catch (error) {
      console.error(
        'An unexpected error occurred while fetching selectedMenus:',
        error
      );
    }
  }

  deleteItem(menuType: string, index: number): void {
    try {
      const storedMenus =
        JSON.parse(localStorage.getItem('selectedMenus')) || {};
      const selectedMenu = storedMenus[menuType];

      if (selectedMenu && selectedMenu.length > index) {
        selectedMenu.splice(index, 1);

        // Remove the menu if it becomes empty
        if (selectedMenu.length === 0) {
          delete storedMenus[menuType];
        } else {
          storedMenus[menuType] = selectedMenu;
        }

        localStorage.setItem('selectedMenus', JSON.stringify(storedMenus));

        this.selectedMenus = Object.keys(storedMenus).map((type) => ({
          menuType: type,
          subMenuItems: storedMenus[type],
        }));

        console.log(
          'Deleted item at index',
          index,
          'from menu with Type',
          menuType
        );
        this.updateMenuCategoryState();
      } else {
        console.log(
          'Unable to delete item at index',
          index,
          'from menu with Type',
          menuType
        );
      }
    } catch (error) {
      console.error(
        'An unexpected error occurred while deleting the item:',
        error
      );
    }
  }

  todayMenu() {
    try {
      this.isLoading = true;
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      const selectedMenus =
        JSON.parse(localStorage.getItem('selectedMenus')) || {};
      const payload = Object.keys(selectedMenus).map((menuType) => ({
        menuType,
        sub_menu_items: selectedMenus[menuType].map((item) => item.id),
      }))[0];

      this._http
        .addTodayMenu(token, payload)
        .subscribe(
          (response) => {
            console.log('Response from addTodayMenu API:', response);
            localStorage.removeItem('selectedMenus');
            this.selectedMenus = [];
            this.toastr.success('Today menu added successfully!');
            this.showSidebar = false;
            this.updateMenuCategoryState();
          },
          (error) => {
            console.error('Error adding today menu:', error);

            // Extract and display the relevant error message
            const errorMessage =
              error.error && error.error.message
                ? error.error.message
                : 'An error occurred.';
            this.toastr.error(errorMessage);
          }
        )
        .add(() => {
          // this.spinner.hide('todayMenuSpinner');
          this.isLoading = false;
        });
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }

  setBillStatus(status: string) {
    this.selectedBillStatus = status;
    this.saveBillStatus(status);
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { position: 'end' });
  }

  openNoBackdrop(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { backdrop: false });
  }

  confirmOrder() {
    try {
      const storedCartItems = localStorage.getItem('cartItems');

      if (storedCartItems) {
        const cartItems = this.cartService.getCartItems();
        const billStatus = this.selectedBillStatus;

        if (!cartItems || cartItems.length === 0) {
          console.log('No items in the cart.');
          return;
        }

        if (cartItems && cartItems.length > 0) {
          // Check if emp_id is provided
          if (!this.empId) {
            this.toastr.error('Please add an employee id.');
            return;
          }

          const orderItems: OrderDataItem[] = cartItems.map((item) => ({
            itemId: item.itemId,
            quantity: item.quantity ? item.quantity.toString() : '0',
            item_name: item.item_name,
            menu_id: item.menu_id,
            price: item.price,
          }));

          const orderPayload: OrderData = {
            bill_status: 'unpaid',
            order_rec: orderItems,
            emp_id: this.empId,
          };

          const token = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).data.token
            : '';

          this.isLoading = true;

          this._https
            .placeOrder(orderPayload, token)
            .subscribe(
              (response) => {
                console.log(response);
                localStorage.removeItem('cartItems');
                localStorage.removeItem('selectedBillStatus');
                this.loadCartItems();
                this.cartItems = [];
                this.toastr.success('Order placed successfully!');
                this.offcanvasService.dismiss();
                this.updateMenuCategoryState();
                this.cartService.updateCartItems([]);

                // Set sidebarState to 'closed'
                // localStorage.setItem('sidebarState', 'closed');
              },
              (error) => {
                console.error('Error placing order:', error);
              }
            )
            .add(() => {
              this.isLoading = false;
            });
        } else {
          console.log('No items in the cart.');
        }
      } else {
        console.log('No items in the cart.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }

  deleteItems(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  increaseQuantity(index: number): void {
    if (this.cartItems[index].quantity < 10) {
      this.cartItems[index].quantity++;
      this.updatePrice(index);
    }
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updatePrice(index);
    }
  }

  updatePrice(index: number): void {
    this.cartItems[index].price =
      this.cartItems[index].initialPrice * this.cartItems[index].quantity;
    this.saveCartItems();
  }

  addItemToCart(item_name: string, price: number, itemId: string): void {
    const userJSON = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    if (!userJSON) {
      this.toastr.error('You must be logged in to add items to the cart.');
      return;
    }

    const cartItem = {
      item_name: item_name,
      quantity: 1,
      price: price,
      initialPrice: price,
      itemId: itemId,
    };

    const existingItems = this.cartItems || [];
    if (existingItems.some((item) => item.item_name === item_name)) {
      this.toastr.error('Item with the same name is already in the cart.');
      return;
    }

    existingItems.push(cartItem);
    this.cartItems = existingItems;
    this.saveCartItems();
    this.cartService.updateCartItems(existingItems);
    this.toastr.success('Item added to cart successfully!');
  }

  openCustomOrderModal(event: Event): void {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'custom-modal',
    });

    modalRef.componentInstance.modalType = 'custom-order';
    modalRef.componentInstance.listSub.subscribe(() => {
      this.listSub.emit();
    });
  }

  openEditModal(item: any): void {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'addItem-modal',
    });

    // Pass the item data and selected category to the modal for editing
    modalRef.componentInstance.modalType = 'addItem-modal';
    modalRef.componentInstance.editedItem = item;
    modalRef.componentInstance.selectedCategory = this.selectedCategory;

    // Add the selected category to the URL query parameters
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { selectedCategory: this.selectedCategory },
      queryParamsHandling: 'merge',
    });

    modalRef.componentInstance.itemDeleted.subscribe(() => {
      this.itemDeleted.emit();
    });
  }

  openAddItemModal(event: Event): void {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'addItem-modal',
    });

    modalRef.componentInstance.modalType = 'addItem-modal';
    modalRef.componentInstance.itemAdded.subscribe((addedItem) => {
      // if (this.isItemInCart(addedItem)) {
      //   this.toastr.error('Item with the same name is already in the cart.');
      // } else {
      //   this.saveCartItems();
      //   this.toastr.success('Item added to cart successfully!');
      // }
      this.cartItems.push(addedItem);
      this.itemAdded.emit();
    });
  }

  openDeleteConfirmation(content: TemplateRef<any>, item: item) {
    this.item = item; // Set the selected item in the component
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'addItem-modal',
    });
  }

  deleteButton() {
    if (this.item) {
      this.isDeleteLoading = true; // Set loading state to true
      console.log(this.item._id, 'item');

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      this._http
        .deleteItems(token, this.item._id)
        .subscribe(
          (result) => {
            if (result) {
              this.toastr.success('Item Deleted Successfully');
              this.itemDeleted.emit();
              this.modalService.dismissAll();
            } else {
              this.toastr.error('Failed to Delete Item');
            }
          },
          (error) => {
            console.error('Error deleting item:', error);
            this.toastr.error('Failed to delete item');
          }
        )
        .add(() => {
          this.isDeleteLoading = false; // Set loading state to false when the operation is complete
        });
    }
  }

  isItemInCart(item: any): boolean {
    return this.cartItems.some(
      (cartItem) => cartItem.item_name === item.item_name
    );
  }

  isAllButtonsDisabled(): boolean {
    return Object.keys(this.selectedMenus).length > 0;
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
function takeUntil(
  ngUnsubscribe: Subject<void>
): import('rxjs').OperatorFunction<any[], unknown> {
  throw new Error('Function not implemented.');
}
