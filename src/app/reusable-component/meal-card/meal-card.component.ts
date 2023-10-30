import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-meal-card',
  templateUrl: './meal-card.component.html',
  styleUrls: ['./meal-card.component.scss'],
})
export class MealCardComponent implements OnInit {
  @Input() selectedCategory: string;
  meals: any[] = [];

  constructor(
    private _https: CommonServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    console.log('Meals:', this.meals);
    console.log('Selected Category:', this.selectedCategory);
    this.filterMeals();
  }

  filterMeals() {
    try {
      this._https.menuList().subscribe((response) => {
        if (response.data && response.data.length > 0) {
          this.meals = response.data;
        } else {
          this.toastr.error('No meals found');
        }
      });
    } catch (error) {
      console.error(error);
      this.toastr.error(
        'An unexpected error occurred. Please try again later.'
      );
    }
  }

  addItemToCart(item_name: string, price: number, _id: string): void {
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
      _id: _id,
      bill_status: 'paid',
      menu_id: '',
    };

    console.log(cartItem.menu_id);

    const existingItems = localStorage.getItem('cartItems');
    let cartItems = [];

    if (existingItems) {
      cartItems = JSON.parse(existingItems);
      if (cartItems.some((item) => item.item_name === item_name)) {
        this.toastr.error('Item with the same name is already in the cart.');
        return;
      }
    }
    for (const meal of this.meals) {
      for (const item of meal.items) {
        if (item._id === _id) {
          cartItem.menu_id = meal.menu_id;
          break;
        }
      }
      if (cartItem.menu_id) {
        break;
      }
    }

    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.toastr.success('Item added to cart successfully!');
  }
}
