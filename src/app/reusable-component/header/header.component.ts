import { OrderData, OrderDataItem } from 'src/data';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  cartItems: any[] = [];
  quantity: false;
  get hasToken(): boolean {
    const userJSON = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    return !!userJSON;
  }
  get hasCartItems(): boolean {
    const existingItems = localStorage.getItem('cartItems');
    return !!existingItems && JSON.parse(existingItems).length > 0;
  }
  get cartItemCount(): number {
    const existingItems = localStorage.getItem('cartItems');
    if (existingItems) {
      const cartItems = JSON.parse(existingItems);
      return cartItems.length;
    }
    return 0;
  }
  constructor(
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private _https: CommonServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
    // this.confirmOrder();
  }

  private saveCartItems(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  private loadCartItems(): void {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
      this.cartItems = JSON.parse(storedItems);
    }
  }

  private updateLocalStorageAndCart(index: number, quantity: number): void {
    this.cartItems[index].quantity = quantity;
    this.saveCartItems();
    this.loadCartItems();
  }

  openEnd(content: TemplateRef<any>) {
    this.offcanvasService.open(content, {
      panelClass: 'details-panel',
      position: 'end',
    });
    this.loadCartItems();
  }

  openLoginModal(event: Event): void {
    // const status = localStorage.getItem('user')
    //   ? JSON.parse(localStorage.getItem('user')).data.statusValue
    //   : '';
    // const status1 = JSON.parse(localStorage.getItem('user1')).status;

    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'custom-modal',
    });
    modalRef.componentInstance.product = {};
  }

  confirmOrder() {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        const cartItems: OrderDataItem[] = JSON.parse(storedCartItems);

        const orderItems: OrderDataItem[] = cartItems.map((item) => {
          return {
            item_name: item.item_name,
            quantity: item.quantity.toString(),
            price: item.price.toString(),
          };
        });

        const orderPayload: OrderData = {
          order_rec: orderItems,
        };

        const token = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user')).data.token
          : '';

        this._https.placeOrder(orderPayload, token).subscribe((response) => {
          console.log(response);
          localStorage.removeItem('cartItems');
          this.offcanvasService.dismiss();
          this.loadCartItems();
          window.location.reload();
        });
      } else {
        console.log('No items in the cart.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  }

  closeCanvas() {
    this.offcanvasService.dismiss();
  }

  deleteItem(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      this.updateLocalStorageAndCart(index, this.cartItems[index].quantity);
    }
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
    this.updateLocalStorageAndCart(index, this.cartItems[index].quantity);
  }

  logout() {
    localStorage.clear();
    this.toastr.success('LogOut Successful');
  }
}
