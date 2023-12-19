import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { SelectedmenusService } from 'src/app/services/selectedmenus.service';
import { ModalComponent } from '../modal/modal.component';
import { Router } from '@angular/router';

interface Item {
  itemName: string;
  price: number;
  quantity: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface Meal {
  _id: string;
  type: string;
  Item: Item[]; // Change this line to use the Item interface
  date: string[];
  time: string;
  __v: number;
}

interface MealCategory {
  title: string;
  time: string;
  items: Meal[]; // Change this line to use the Meal interface
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
  @Output() selectedItemChange: EventEmitter<Meal[]> = new EventEmitter<
    Meal[]
  >();
  meals: MealCategory[] = [];
  submenu: any[] = [];
  items: any[] = [];
  totalMeals: any[] = [];

  constructor(
    private _https: CommonServiceService,
    private toastr: ToastrService,
    // private http: AdminService,
    private modalService: NgbModal,
    private router: Router
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
        if (response.statusCode === 200 && response.success) {
          const data = response.data;

          this.meals = [
            {
              title: 'Breakfast',
              time: '8:00 AM - 9:00 AM',
              items: data.Breakfast,
            },
            { title: 'Lunch', time: '12:00 PM - 1:00 PM', items: data.Lunch },
            { title: 'Snack', time: '4:00 PM - 5:00 PM', items: data.Snack },
          ];
        } else {
          this.toastr.error('Failed to fetch menu. Please try again later.');
        }
      });
    } catch (error) {
      console.error(error);
      this.toastr.error(
        'An unexpected error occurred. Please try again later.'
      );
    }
  }

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
      ? JSON.parse(localStorage.getItem('user')).data.empdetails
      : null;

    if (!userJSON) {
      this.openLoginModal(event);
      this.toastr.error('You must be logged in to add items to the cart.');
      return;
    }

    // Check if the user has the "admin" role
    if (userJSON.role === 'admin') {
      this.toastr.error(
        'Admins are restricted from ordering items from the User panel'
      );
      this.router.navigate(['/custom-order']);
      return;
    }

    const menuType = this.selectedCategory.toLowerCase();
    const orderRecords = JSON.parse(localStorage.getItem('cartItems')) || {};

    // Check if menuType already exists in orderRecords
    if (!orderRecords[menuType]) {
      // If not, create an array for it
      orderRecords[menuType] = [];
    }

    console.log('Existing orderRecords:', orderRecords);

    // Check if the item already exists in the orderRecords for the current menuType
    const existingItem = orderRecords[menuType].find(
      (record) => record.itemId === itemId
    );

    if (existingItem) {
      // If the item already exists, update the quantity
      existingItem.quantity += 1;
      console.log('Item already exists. Updated quantity:', existingItem);
    } else {
      // If the item does not exist, add a new record
      orderRecords[menuType].push({
        itemId: itemId,
        quantity: 1,
      });
      console.log('Added new item:', orderRecords[menuType]);
    }

    const orderData = {
      menuType: menuType,
      orderRecords: orderRecords[menuType],
    };

    console.log('Final orderData:', orderData);

    localStorage.setItem('cartItems', JSON.stringify(orderData));

    this.toastr.success('Item added to cart successfully!');
  }

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
