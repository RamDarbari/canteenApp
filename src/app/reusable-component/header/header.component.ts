import { OrderData, OrderDataItem } from 'src/data';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showUserSection: boolean = true;
  showAdminSection: boolean = true;
  cartItems: any[] = [];
  quantity: false;
  isAdmin: boolean = false;
  selectedBillStatus: string = 'Unpaid';

  constructor(
    private modalService: NgbModal,
    private offcanvasService: NgbOffcanvas,
    private _https: CommonServiceService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.getUserRole() === 'admin';
    this.getUserRole();
  }

  // ... (existing methods)

  getUserRole(): string {
    const userRole = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.empDetails.role
      : '';
    return userRole;
  }

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
  get userProfileDetails() {
    const userDetails = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.empDetails
      : '';
    return userDetails;
  }

  get wallet() {
    const userWalletBalance = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.empDetails.wallet
      : '';
    return userWalletBalance;
  }

  get totalBalance() {
    const pendingBalance = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.empDetails.balance
      : '';
    return pendingBalance;
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

  setBillStatus(status: string) {
    // Loop through your cartItems and set the bill_status property for each item
    this.cartItems.forEach((item) => {
      item.bill_status = status;
    });

    // Save the updated cartItems to localStorage
    this.saveCartItems();
  }

  confirmOrder() {
    try {
      const storedCartItems = localStorage.getItem('cartItems');
      if (storedCartItems) {
        const cartItems: OrderDataItem[] = JSON.parse(storedCartItems);
        const billStatus = this.selectedBillStatus;

        if (cartItems) {
          const billStatus =
            cartItems.length > 0 ? cartItems[0].bill_status : 'unpaid';

          const orderItems: OrderDataItem[] = cartItems.map((item) => {
            return {
              itemId: item.itemId,
              quantity: item.quantity ? item.quantity.toString() : '0',
            };
          });

          const orderPayload: OrderData = {
            bill_status: billStatus,
            order_rec: orderItems,
            emp_id: '3673',
          };
          const token = localStorage.getItem('user')
            ? JSON.parse(localStorage.getItem('user')).data.token
            : '';

          this._https.placeOrder(orderPayload, token).subscribe((response) => {
            console.log(response);
            localStorage.removeItem('cartItems');
            this.offcanvasService.dismiss();
            this.loadCartItems();
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

  deleteItem(index: number): void {
    this.cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  increaseQuantity(index: number): void {
    if (this.cartItems[index].quantity < 999) {
      this.cartItems[index].quantity++;
      // this.updatePrice(index);
      this.updateLocalStorageAndCart(index, this.cartItems[index].quantity);
    }
  }

  decreaseQuantity(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
      // this.updatePrice(index);
      this.updateLocalStorageAndCart(index, this.cartItems[index].quantity);
    }
  }

  // updatePrice(index: number): void {
  //   const originalItemPrice = this.cartItems[index].originalPrice;

  //   if (this.cartItems[index].quantity > 0) {
  //     this.cartItems[index].price =
  //       originalItemPrice * this.cartItems[index].quantity;
  //   } else {
  //     this.cartItems[index].price = 0;
  //   }

  //   this.saveCartItems();
  // }

  logout() {
    // const token = localStorage.getItem('user')
    //   ? JSON.parse(localStorage.getItem('user')).data.token
    //   : '';
    // try {
    //   this._https.logout(token).subscribe((response) => {
    //     if (response) {
    //       localStorage.clear();
    //       this.toastr.success('Log-out Successful');
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
    localStorage.clear();
    this.toastr.success('Log-out Successful');
  }
  closeCanvas() {
    this.offcanvasService.dismiss();
  }
}
