// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(
    []
  );
  cartItems$: Observable<any[]> = this.cartItemsSubject.asObservable();
  private localStorageKey = 'cartItems';

  constructor() {
    // Load cart items from local storage on service initialization
    const storedItems = localStorage.getItem(this.localStorageKey);
    if (storedItems) {
      this.cartItemsSubject.next(JSON.parse(storedItems));
    }
  }

  private saveToLocalStorage(items: any[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(items));
  }

  updateCartItems(items: any[]): void {
    this.cartItemsSubject.next(items);
    // Save cart items to local storage whenever it's updated
    this.saveToLocalStorage(items);
  }

  getCartItems(): any[] {
    return this.cartItemsSubject.getValue();
  }
}
