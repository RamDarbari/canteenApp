import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { SelectedmenusService } from 'src/app/services/selectedmenus.service';
import { ModalComponent } from '../modal/modal.component';

interface MenuItem {
  id: string;
  menuName: string;
  itemName: string;
}
@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
})
export class MealCardComponent implements OnInit {
  @Input() selectedCategory: string;
  @Input() displayNormalMealCard: boolean = false;
  @Input() displayAddItemToCartCard: boolean = false;
  @Input() displayTotalItems: boolean = false;
  @Output() selectedItemChange: EventEmitter<MenuItem[]> = new EventEmitter<
    MenuItem[]
  >();
  meals: any[] = [];
  submenu: any[] = [];
  items: any[] = [];
  totalMeals: any[] = [];

  constructor(
    private _https: CommonServiceService,
    private toastr: ToastrService,
    private http: AdminService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    console.log('Meals:', this.meals);
    console.log('Selected Category:', this.selectedCategory);
    this.filterMeals();
    // this.filterSubMenuList();
  }

  filterMeals() {
    try {
      this._https.menuList().subscribe((response) => {
        if (response.data && response.data.length > 0) {
          this.meals = response.data;
        } else {
          // this.toastr.error('No meals found');
        }
      });
    } catch (error) {
      console.error(error);
      this.toastr.error(
        'An unexpected error occurred. Please try again later.'
      );
    }
  }

  // filterSubMenuList() {
  //   try {
  //     const token = localStorage.getItem('user')
  //       ? JSON.parse(localStorage.getItem('user')).data.token
  //       : '';
  //     this.http.addminMenuList(token).subscribe((response) => {
  //       if (response.data && response.data.length > 0) {
  //         this.submenu = response.data;
  //       } else {
  //         this.toastr.error('No meals found');
  //       }
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     this.toastr.error(
  //       'An unexpected error occurred. Please try again later.'
  //     );
  //   }
  // }

  openLoginModal(event: Event): void {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'custom-modal',
    });

    // Pass the modalType to the opened modal
    modalRef.componentInstance.modalType = 'login-modal';
  }

  addItemToCart(item_name: string, price: number, itemId: string): void {
    const userJSON = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    if (!userJSON) {
      this.openLoginModal(event);
      this.toastr.error('You must be logged in to add items to the cart.');
      return;
    }

    const cartItem = {
      item_name: item_name,
      quantity: 1,
      price: price,
      itemId: itemId,
    };

    const existingItems = localStorage.getItem('cartItems');
    let cartItems = [];

    if (existingItems) {
      cartItems = JSON.parse(existingItems);
      if (cartItems.some((item) => item.item_name === item_name)) {
        this.toastr.error('Item with the same name is already in the cart.');
        return;
      }
    }
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.toastr.success('Item added to cart successfully!');
  }

  // addTodayMenu(
  //   menuType: string,
  //   subMenuItems: { id: string; menuName: string; itemName: string }[]
  // ) {
  //   try {
  //     const storedMenus =
  //       JSON.parse(localStorage.getItem('selectedMenus')) || {};

  //     if (!storedMenus[menuType]) {
  //       storedMenus[menuType] = [];
  //     }

  //     subMenuItems.forEach((subMenuItem) => {
  //       const { id, menuName, itemName } = subMenuItem;

  //       if (!storedMenus[menuType].some((item) => item.id === id)) {
  //         storedMenus[menuType].push({ id, menuName, itemName });
  //       }
  //     });

  //     localStorage.setItem('selectedMenus', JSON.stringify(storedMenus));

  //     console.log('Menu added to localStorage:', storedMenus);
  //   } catch (error) {
  //     console.error(error);
  //     this.toastr.error(
  //       'An unexpected error occurred. Please try again later.'
  //     );
  //   }
  // }

  isMealCardEnabled(time: string): boolean {
    const mealTime = new Date();
    const currentTime = new Date();

    const [startTime, endTime] = time.split(' - ');

    // Set start time to 15 minutes before the meal starts
    mealTime.setHours(
      parseInt(startTime.split(':')[0]),
      parseInt(startTime.split(':')[1]) - 15,
      0
    );

    // Set end time to 15 minutes after the meal ends
    const endTimeObj = new Date(currentTime);
    endTimeObj.setHours(
      parseInt(endTime.split(':')[0]),
      parseInt(endTime.split(':')[1]) + 15,
      0
    );

    return currentTime >= mealTime && currentTime <= endTimeObj;
  }
}
