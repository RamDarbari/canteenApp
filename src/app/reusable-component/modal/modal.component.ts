import { UserData } from './../../../data';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { CartService } from 'src/app/services/cart.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { login } from 'src/data';

interface MenuItem {
  _id: string;
  menu_id: string;
  item_name: string;
  price: number;
  quantity: number;
  title: string;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  loginData: login = {
    emp_id: null,
    otp: '',
  };
  isLoading: boolean = false;
  otpVerified: boolean = false;
  @Input() additem: string = 'addItem';
  @Input() modalType: string = 'default';
  @Output() userAdded = new EventEmitter<void>();
  @Output() itemDeleted = new EventEmitter<void>();
  @Output() itemAdded = new EventEmitter<void>();
  selectedMenuTitle: string | null = null;
  menuItems: MenuItem[] = [];
  editedItem: MenuItem | null = null;
  editedEmployee: UserData | null = null;
  form: FormGroup;

  constructor(
    private loginService: CommonServiceService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private http: AdminService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private cartService: CartService
  ) {
    this.form = this.fb.group({
      item_name: ['', Validators.required],
      price: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.modalType === 'addItem-modal' && this.editedItem) {
      this.form.patchValue({
        item_name: this.editedItem.item_name,
        price: this.editedItem.price,
      });
    }
    this.menuList();
  }

  sendOTP() {
    try {
      this.isLoading = true;
      this.loginService
        .requestOTP(this.loginData.emp_id)
        .subscribe((response) => {
          if (response.message === 'success') {
            this.otpVerified = true;
            this.toastr.success('Otp Sent Successfully');
            localStorage.setItem('user', JSON.stringify(response));
          } else {
            this.otpVerified = false;
            this.toastr.error('Failed to send OTP');
          }
        })
        .add(() => {
          this.isLoading = false;
        });
    } catch (error) {
      console.error('Error sending OTP:', error);
      this.toastr.error('Failed to send OTP');
      this.isLoading = false;
    }
  }

  verifyOTP() {
    try {
      const emp_id = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.emp_id
        : null;
      this.isLoading = true;

      this.loginService
        .verifyOTP(this.loginData, emp_id)
        .subscribe((response) => {
          if (response.statusCode === 200) {
            this.isLoading = false;
            localStorage.setItem('user', JSON.stringify(response));

            const userRole = response.data.empdetails.role;

            if (userRole === 'admin') {
              this.toastr.success('Admin Login Successful');
              this.router.navigate(['/admin']);
            } else {
              this.toastr.success('Login Successful');
            }
            // this.toastr.success('Login Successful');
            this.modalService.dismissAll();
          } else {
            this.toastr.error('Failed to verify OTP');
          }
        });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      this.toastr.error('Failed to verify OTP');
    } finally {
      this.isLoading = false;
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  onMenuTitleChange() {
    const selectedMenu = this.menuItems.find(
      (menu) => menu._id === this.selectedMenuTitle
    );

    if (selectedMenu) {
      this.form.patchValue({
        item_name: selectedMenu.item_name,
        price: selectedMenu.price,
      });

      this.cdr.detectChanges();
    }
  }

  menuList() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.http.listmenu(token).subscribe((response: any) => {
        console.log(response);
        if (response) {
          this.menuItems = response.data;
          console.log(this.menuItems, 'vvvvvhvhvhvvhvhvhvhvhvhvh');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(data: any, addProduct: NgForm) {
    try {
      // Remove the query param check and use the selected menu directly
      const selectedMenu = this.menuItems.find(
        (menu) => menu._id === this.selectedMenuTitle
      );

      if (!selectedMenu) {
        console.error('Select The Menu');
        this.toastr.error('Select The Menu');
        return;
      }

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      data.menu_id = selectedMenu._id;

      if (this.editedItem) {
        this.editedItem.item_name = data.item_name;
        this.editedItem.price = data.price;
        this.saveEditedItem();
      } else {
        this.http.addItem(data, token).subscribe((result) => {
          if (result) {
            this.toastr.success('Item Added Successfully');
            this.menuItems.push(data);
            this.modalService.dismissAll();
            this.itemAdded.emit();
          } else {
            this.toastr.error('Failed to Add Item');
          }
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      this.toastr.error('Failed to submit form');
    }
  }

  onDelete(itemId: string) {
    try {
      const selectedMenu = this.menuItems.find(
        (menu) => menu._id === this.selectedMenuTitle
      );

      if (!selectedMenu) {
        console.error('Select The Menu');
        this.toastr.error('Select The Menu');
        return;
      }

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      this.http.deleteItems(token, itemId).subscribe(
        (result) => {
          if (result) {
            this.toastr.success('Item Deleted Successfully');
            this.itemDeleted.emit();
            this.modalService.dismissAll();
          } else {
            this.toastr.error('Failed to Delete Item');
          }
        },
        (error) => {
          console.error('Error deleting item:', error);
          this.toastr.error('Failed to delete item');
        }
      );
    } catch (error) {
      console.error('Error deleting item:', error);
      this.toastr.error('Failed to delete item');
    }
  }

  saveEditedItem() {
    if (this.editedItem) {
      try {
        const selectedMenu = this.menuItems.find(
          (menu) => menu._id === this.selectedMenuTitle
        );

        if (!selectedMenu) {
          console.error('Selected menu is not valid.');
          return;
        }

        const token = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user')).data.token
          : '';
        const itemId = this.editedItem._id;

        this.form.patchValue({
          item_name: this.editedItem.item_name,
          price: this.editedItem.price,
        });

        const updatedItem = {
          _id: itemId,
          menu_id: selectedMenu._id, // Use the _id from the selected menu
          item_name: this.form.value.item_name,
          price: this.form.value.price,
        };

        this.http.updateItems(token, itemId, updatedItem).subscribe(
          (result) => {
            if (result) {
              this.toastr.success('Item Updated Successfully');
              this.editedItem = null;
              this.modalService.dismissAll();
            } else {
              this.toastr.error('Failed to Update Item');
            }
          },
          (error) => {
            console.error('Error updating item:', error);
            this.toastr.error('Failed to update item');
          }
        );
      } catch (error) {
        console.error('Error updating item:', error);
        this.toastr.error('Failed to update item');
      }
    }
  }

  onSubmitCustomOrder(formData: any, form: any): void {
    try {
      this.modalService.dismissAll();

      const initialPrice = formData.price;
      const cartItem = {
        item_name: formData.item_name,
        quantity: 1,
        price: formData.price,
        initialPrice: initialPrice,
      };

      const existingItems = localStorage.getItem('cartItems');
      let cartItems = [];

      if (existingItems) {
        cartItems = JSON.parse(existingItems);
      }

      cartItems.push(cartItem);
      // localStorage.setItem('cartItems', JSON.stringify(cartItems));
      this.cartService.updateCartItems(cartItems);
      form.resetForm();
      this.toastr.success(` ${formData.item_name} added to your order`);
      this.modalService.dismissAll();
    } catch (error) {
      console.error('Error submitting custom order:', error);
      this.toastr.error('Failed to submit custom order');
    }
  }

  onSubmitEmployee(formData: any, form: NgForm): void {
    console.log('onSubmitEmployee function called with data:', formData);
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      const employeeData = {
        emp_id: formData.emp_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        role: formData.role,
      };

      this.http.updateEmployee(token, employeeData).subscribe(
        (response) => {
          console.log('Employee creation successful', response);
          // Additional logic if needed
          this.toastr.success('Employee Created Successfully');
          this.userAdded.emit();
          this.modalService.dismissAll();
        },
        (error) => {
          console.error('Error creating employee:', error);
          this.toastr.error('Failed to create employee');
        }
      );
    } catch (error) {
      console.error('Error submitting employee:', error);
      this.toastr.error('Failed to submit employee');
    }
  }
}
