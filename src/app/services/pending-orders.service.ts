import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class PendingOrdersService {
  private ordersSubject: BehaviorSubject<Order[]> = new BehaviorSubject<
    Order[]
  >([]);
  orders$: Observable<Order[]> = this.ordersSubject.asObservable();

  constructor() {}

  setOrders(orders: Order[]): void {
    this.ordersSubject.next(orders);
  }

  updateOrders(updatedOrders: Order[]): void {
    this.ordersSubject.next(updatedOrders);
  }
}
