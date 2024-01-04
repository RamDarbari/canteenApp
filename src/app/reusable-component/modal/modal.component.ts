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
  @Output() listSub = new EventEmitter<void>();
  @Output() profile = new EventEmitter<void>();
  @Input() selectedCategory: string;
  selectedMenuTitle: string = '';
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
      const editedItemCategory = this.menuItems.find(
        (menu) => menu._id === this.editedItem.menu_id
      );
      if (editedItemCategory) {
        this.selectedMenuTitle = editedItemCategory._id;
      }

      this.form.patchValue({
        item_name: this.editedItem.item_name,
        price: this.editedItem.price,
      });
    } else {
      this.selectedMenuTitle = '';
    }
    if (this.modalType !== 'login-modal') {
      this.menuList();
    }

    this.route.queryParams.subscribe((queryParams) => {
      this.selectedCategory = queryParams['selectedCategory'] || '';
    });

    this.form.valueChanges.subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  isFormValid(): boolean {
    return this.form.valid;
  }

  private updateQueryParams() {
    const queryParams = {
      selectedCategory: this.selectedCategory,
    };

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  private clearQueryParams() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      queryParamsHandling: 'merge',
    });
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
            // localStorage.setItem('user', JSON.stringify(response));
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
      this.toastr.error(error.error.message || 'Failed to send OTP');
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
          if (response.success) {
            this.isLoading = false;
            // localStorage.setItem('user', JSON.stringify(response));
            this.profile.emit();
            const userRole = response.data.empDetails?.role;
            if (userRole === 'admin') {
              this.toastr.success('Admin Login Successful');
              this.router.navigate(['/admin']);
            } else {
              this.toastr.success('Login Successful');
            }

            this.modalService.dismissAll();
          }
        })
        .add(() => {
          this.isLoading = false;
        });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      this.toastr.error(error.error.message || 'Failed to verify OTP');
    }
  }

  closeModal() {
    this.modalService.dismissAll();
    this.selectedCategory = '';
    this.selectedMenuTitle = '';

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {},
      replaceUrl: true,
    });
  }

  onMenuTitleChange() {
    const selectedMenu = this.menuItems.find(
      (menu) => menu._id === this.selectedMenuTitle
    );

    if (selectedMenu) {
      this.form.patchValue({
        title: selectedMenu.title,
        item_name: selectedMenu.item_name,
        price: selectedMenu.price,
      });
    }
    this.updateQueryParams();
  }

  menuList() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.http.listmenu(token).subscribe((response: any) => {
        if (response) {
          this.menuItems = response.data;

          // Filter menuItems based on the selectedCategory
          if (this.selectedCategory) {
            this.menuItems = this.menuItems.filter(
              (menu) => menu.title === this.selectedCategory
            );
          }

          // Select the first menu item if none is selected
          if (!this.selectedMenuTitle && this.menuItems.length > 0) {
            this.selectedMenuTitle = this.menuItems[0]._id;
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit(data: any, addProduct: NgForm) {
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
            this.selectedCategory = '';
            this.selectedMenuTitle = '';

            this.router.navigate([], {
              relativeTo: this.route,
              queryParams: {},
              replaceUrl: true,
            });
          } else {
            this.toastr.error('Failed to Add Item');
          }
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      this.toastr.error(error.error.message || 'Failed to submit form');
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
          this.toastr.error(error.error.message || 'Failed to delete item');
        }
      );
    } catch (error) {
      console.error('Error deleting item:', error);
      this.toastr.error(error.error.message || 'Failed to delete item');
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

            if (error && error.error && error.error.message) {
              this.toastr.error(error.error.message); // Display the error message using Toastr
            } else {
              this.toastr.error('Failed to update item');
            }
          }
        );
      } catch (error) {
        console.error('Error updating item:', error);
        this.toastr.error(error.error.message || 'Failed to update item');
      }
    }
  }

  onSubmitCustomOrder(formData: any, form: any): void {
    try {
      this.modalService.dismissAll();

      const initialPrice = formData.price;
      const newItem = {
        item_name: formData.item_name,
        quantity: 1,
        price: formData.price,
        initialPrice: initialPrice,
        item_type: 'custom',
        menu_id: '6579a8e25c1fd82c679abce3',
      };

      const existingItems = localStorage.getItem('cartItems');
      let cartItems = [];

      if (existingItems) {
        cartItems = JSON.parse(existingItems);

        const existingItemIndex = cartItems.findIndex(
          (item) => item.item_name === newItem.item_name
        );

        if (existingItemIndex !== -1) {
          cartItems[existingItemIndex].quantity += 1;
          this.toastr.warning(
            `Item '${newItem.item_name}' already in the cart. Quantity updated.`
          );
          return;
        }
      }

      // If not exists or no existing items, add the new item
      cartItems.push(newItem);
      this.cartService.updateCartItems(cartItems);

      // Send the form data to your API
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.http.addItem(newItem, token).subscribe(
        (response) => {
          this.toastr.success(`${formData.item_name} added to your order`);
          form.resetForm();
          this.modalService.dismissAll();
          this.listSub.emit();
        },
        (error) => {
          console.error('Error adding custom order to API:', error);
          this.toastr.error(
            error.error.message ||
              'Failed to add custom order. Please try again.'
          );
        }
      );
    } catch (error) {
      console.error('Error submitting custom order:', error);
      this.toastr.error(error.error.message || 'Failed to submit custom order');
    }
  }

  onSubmitEmployee(formData: any, form: NgForm): void {
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

      this.http.createEmployee(token, employeeData).subscribe(
        () => {
          this.toastr.success('Employee Created Successfully');
          this.userAdded.emit();
          this.modalService.dismissAll();
        },
        (error) => {
          console.error('Error creating employee:', error);
          this.toastr.error(error.error.message || 'Failed to create employee');
        }
      );
    } catch (error) {
      console.error('Error submitting employee:', error);
      this.toastr.error(error.error.message || 'Failed to submit employee');
    }
  }
}
