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
  @Input() displayNormalMealCard: boolean = false;
  @Input() displayAddItemToCartCard: boolean = false;
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
}
