import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItemsSubject.next(JSON.parse(storedItems));
    }
  }

  updateCartItems(items: any[]): void {
    this.cartItemsSubject.next(items);
    localStorage.setItem('cartItems', JSON.stringify(items));
  }

  getCartItems(): any[] {
    return this.cartItemsSubject.getValue();
  }
}
