import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { login } from 'src/data';

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

  constructor(
    private loginService: CommonServiceService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {}

  sendOTP() {
    try {
      this.isLoading = true;
      this.loginService
        .requestOTP(this.loginData.emp_id)
        .subscribe((response) => {
          if (response.message === 'Otp send successfully.') {
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
              this.router.navigate(['/menu/menulist']);
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
}
