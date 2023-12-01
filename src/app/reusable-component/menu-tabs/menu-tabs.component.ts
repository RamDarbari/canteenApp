import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { SelectedmenusService } from 'src/app/services/selectedmenus.service';
import { OrderData, OrderDataItem } from 'src/data';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { NgxSpinnerService } from 'ngx-spinner';

interface MenuItem {
  _id: string;
  item_name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface MenuCategory {
  _id: string;
  title: string;
  time: string;
  items: MenuItem[];
}
interface MenuItem {
  id: string;
  menuName: string;
  itemName: string;
}

@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.component.html',
  styleUrls: ['./menu-tabs.component.scss'],
})
export class MenuTabsComponent implements OnInit {
  menuCategories: MenuCategory[] = [];
  isLoading: boolean = false;
  isActive: boolean = false;
  totalMeals: any[] = [];
  submenu: any[] = [];
  meals: any[] = [];
  selectedMenus: any[] = [];
  cartItems: any[] = [];
  quantity: false;
  selectedCategory: string = '';
  selectedBillStatus: string = '';
  @Input() todaymenu: boolean = false;
  @Input() custommenu: boolean = false;
  empId: string = '';
  selectedCategoryId: string = '';
  customMenu: boolean = true;
  showSidebar: boolean = false;
  isBreakfastDisabled: boolean = false;
  isLunchDisabled: boolean = false;
  isSnacksDisabled: boolean = false;

  // @ViewChild('todayMenuSpinner') todayMenuSpinner: any;

  private selectedMenusSubject: BehaviorSubject<any[]> = new BehaviorSubject<
    any[]
  >([]);
  selectedMenus$ = this.selectedMenusSubject.asObservable();
  private isCategoryDisabledSubject = new BehaviorSubject<{
    [key: string]: boolean;
  }>({});
  isCategoryDisabled$ = this.isCategoryDisabledSubject.asObservable();

  constructor(
    private _http: AdminService,
    private toastr: ToastrService,
    private _https: CommonServiceService,
    private menuService: SelectedmenusService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.filterSubMenuList();
    this.fetchSelectedMenus();
    this.loadCartItems();
    this.updateMenuCategoryState();
    if (this.cartItems && this.cartItems.length > 0) {
      this.showSidebar = true;
    } else {
      this.showSidebar = false;
    }

    const storedMenus = JSON.parse(localStorage.getItem('selectedMenus')) || {};
    this.selectedMenus = Object.keys(storedMenus).map((menuType) => ({
      menuType,
      subMenuItems: storedMenus[menuType],
    }));

    // if (this.selectedMenus && this.selectedMenus.length > 0) {
    //   this.showSidebar = true;
    // } else {
    //   this.showSidebar = false;
    // }

    this.menuService.selectedMenus$.subscribe((selectedMenus) => {
      this.selectedMenus = selectedMenus;
    });
    const storedCategory = localStorage.getItem('selectedCategory');
    this.selectedCategory = storedCategory || 'Breakfast';
    if (this.submenu && this.submenu.length > 0) {
      const initialCategory = this.submenu.find(
        (meal) =>
          meal.title.toLowerCase() === this.selectedCategory.toLowerCase()
      );
      if (initialCategory) {
        this.selectedCategoryId = initialCategory._id;
        this.updateQueryParams();
      }
    }
  }

  openSidebar() {
    console.log('Opening sidebar'); // Add this line
    this.showSidebar = true;
  }

  closeSidebar() {
    this.showSidebar = false;
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
    this.selectedMenus = this.cartItems; // Update selectedMenus as well
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
      queryParams: { categoryId: this.selectedCategoryId },
      queryParamsHandling: 'merge',
    });
  }

  private updateMenuCategoryState() {
    const isCartItemsEmpty = !this.cartItems || this.cartItems.length === 0;

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

    // Store the selected category in localStorage
    localStorage.setItem('selectedCategory', category);

    const selectedCategory = this.submenu.find(
      (meal) => meal.title.toLowerCase() === category.toLowerCase()
    );
    this.selectedCategoryId = selectedCategory ? selectedCategory._id : '';
    this.updateMenuCategoryState();
    this.updateQueryParams();
  }

  openAddItemModal(event: Event): void {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'custom-modal',
    });
    modalRef.componentInstance.modalType = 'addItem-modal';
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

        if (!storedMenus[menuType].some((item) => item.id === id)) {
          storedMenus[menuType].push({ id, menuName, itemName });
        }
      });

      localStorage.setItem('selectedMenus', JSON.stringify(storedMenus));
      this.menuService.updateSelectedMenus(this.selectedMenus);
      this.fetchSelectedMenus();
      console.log('Menu added to localStorage:', storedMenus);
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
      // this.cdr.detectChanges();
      console.log(
        'Fetched selectedMenus from localStorage:',
        this.selectedMenus
      );
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
    this.selectedBillStatus = status; // Update the selectedBillStatus
    this.saveBillStatus(status); // Optionally save it to localStorage
  }

  confirmOrder() {
    try {
      const storedCartItems = localStorage.getItem('cartItems');

      if (storedCartItems) {
        const cartItems: OrderDataItem[] = JSON.parse(storedCartItems);
        const billStatus = this.selectedBillStatus;

        if (cartItems && cartItems.length > 0) {
          // Check if emp_id is provided
          if (!this.empId) {
            this.toastr.error('Please add employee id.');
            return;
          }

          const orderItems: OrderDataItem[] = cartItems.map((item) => {
            return {
              itemId: item.itemId,
              quantity: item.quantity ? item.quantity.toString() : '0',
            };
          });

          const orderPayload: OrderData = {
            bill_status: 'unpaid',
            order_rec: orderItems,
            emp_id: this.empId,
          };

          const token = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).data.token
            : '';

          this.isLoading = true; // Start the loader only if emp_id is provided

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
                // window.location.reload();
                this.showSidebar = false;
              },
              (error) => {
                console.error('Error placing order:', error);
              }
            )
            .add(() => {
              this.isLoading = false; // Stop the loader regardless of success or error
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
    this.toastr.success('Item added to cart successfully!');
    this.updateMenuCategoryState();
  }
}
