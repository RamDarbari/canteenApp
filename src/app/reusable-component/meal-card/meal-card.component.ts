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

  addItemToCart(item_name: string, price: number): void {
    const cartItem = {
      item_name: item_name,
      quantity: 1,
      price: price,
    };
    const existingItems = localStorage.getItem('cartItems');
    let cartItems = [];
    if (existingItems) {
      cartItems = JSON.parse(existingItems);
    }
    cartItems.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    this.toastr.success('Item added to cart successfully!');
  }
}
