import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { login } from 'src/data';

interface MenuItem {
  _id: string;
  menu_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

interface Employee {
  EmployeeId: number;
  FirstName: string;
  LastName: string;
  email: string;
  role: string;
  balance: string;
  wallet: string;
}
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent {
  loginData: login = {
    emp_id: null,
    otp: '',
  };
  isLoading: boolean = false;
  otpVerified: boolean = false;
  @Input() additem: string = 'addItem';
  @Input() modalType: string = 'default';
  menuItems: MenuItem[] = [];
  editedItem: MenuItem | null = null;
  editedEmployee: Employee | null = null;

  constructor(
    private loginService: CommonServiceService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router,
    private http: AdminService,
    private route: ActivatedRoute
  ) {}
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
          if (response.success) {
            this.isLoading = false;
            localStorage.setItem('user', JSON.stringify(response));
            const userRole = response.data.empDetails.role;
            if (userRole === 'admin') {
              this.toastr.success('Admin Login Successful');
              this.router.navigate(['/admin']);
              this.modalService.dismissAll();
            } else {
              this.modalService.dismissAll();
              this.toastr.success('Login Successful');
            }
          }
        })
        .add(() => {
          this.isLoading = false;
        });
    } catch (error) {
      console.error('Error verifying OTP:', error);
      this.toastr.error('Failed to verify OTP');
    }
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  onSubmit(data: any, addProduct: NgForm) {
    try {
      this.route.queryParams.pipe(take(1)).subscribe((params) => {
        const itemId = params['categoryId'];
        if (!itemId) {
          console.error('Menu ID is missing in query parameters.');
          return;
        }

        const token = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user')).data.token
          : '';
        data.menu_id = itemId;

        if (this.editedItem) {
          // Handle edit logic if needed
        } else {
          this.http.addItem(data, token).subscribe((result) => {
            if (result) {
              this.toastr.success('Item Added Successfully');
              this.menuItems.push(data);
              this.modalService.dismissAll();
            } else {
              this.toastr.error('Failed to Add Item');
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  saveEditedItem() {
    if (this.editedItem) {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      const itemId = this.editedItem._id;

      this.http
        .updateItems(token, itemId, this.editedItem)
        .subscribe((result) => {
          if (result) {
            this.toastr.success('Item Updated Successfully');
            this.editedItem = null;
            // this.getproduct();
            // this.cdr.detectChanges();
          } else {
            this.toastr.error('Failed to Update Item');
          }
        });
    }
  }

  onSubmitCustomOrder(formData: any, form: any): void {
    try {
      this.modalService.dismissAll();
      const cartItem = {
        item_name: formData.item_name,
        quantity: formData.quantity,
        price: formData.price,
      };
      const existingItems = localStorage.getItem('cartItems');
      let cartItems = [];
      if (existingItems) {
        cartItems = JSON.parse(existingItems);
      }
      cartItems.push(cartItem);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      form.resetForm();
    } catch (error) {
      console.error('Error submitting custom order:', error);
      this.toastr.error('Failed to submit custom order');
    }
  }

  onSubmitEmployee(formData: any, form: NgForm): void {
    try {
      if (this.editedEmployee) {
        const token = localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user')).data.token
          : '';

        this.http
          .updateEmployee(token, this.editedEmployee.EmployeeId, formData)
          .subscribe(
            (result) => {
              if (result) {
                this.toastr.success('Employee added Successfully');
                this.editedEmployee = null;
                // this.modalService.dismissAll();
                // this.loadEmployeeData();
              } else {
                this.toastr.error('Failed to Update Employee');
              }
            },
            (error) => {
              console.error('Error updating employee:', error);
              this.toastr.error('Failed to Update Employee');
            }
          );
      } else {
        // this.loadEmployeeData();
      }

      form.resetForm();
    } catch (error) {
      console.error('Error submitting employee:', error);
      this.toastr.error('Failed to submit employee');
    }
  }
}
