import { Component } from '@angular/core';
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
  empId: number;
  otp: string;
  loginError: string;
  isOTPRequested: boolean = false;
  data: login;

  constructor(
    private _admin: CommonServiceService,
    private _taostr: ToastrService,
    private modalService: NgbModal
  ) {}

  requestOTP(data: login): void {
    if (!data.emp_id) {
      this.loginError = 'Please enter your employee ID';
      return;
    }

    this._admin.requestOTP(data).subscribe(
      (response) => {
        if (response && response.message === 'OTP sent successfully') {
          this.isOTPRequested = true;
        } else {
          this.loginError = response.message || 'Failed to request OTP';
          this._taostr.success(this.loginError, 'Error');
        }
      },
      (error) => {
        this.loginError = 'Failed to request OTP';
        this._taostr.error(this.loginError, 'Error');
        console.log(error);
      }
    );
  }

  verifyOTP(data: login): void {
    const emp_id = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.emp_id
      : null;

    this._admin.verifyOTP(data, emp_id).subscribe(
      (response) => {
        if (response && response.success) {
          // OTP verification successful, navigate or perform necessary action
          this._taostr.success('OTP Verified Successfully', 'Success');
          this.modalService.dismissAll();
        } else {
          // OTP verification failed, show error message
          this._taostr.error('Failed to verify OTP', 'Error');
        }
      },
      (error) => {
        // Handle error (if needed)
        this._taostr.error('Failed to verify OTP', 'Error');
      }
    );
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';
// import { CommonServiceService } from 'src/app/services/common-service.service';
// import { login } from 'src/data';

// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.scss'],
// })
// export class ModalComponent {
//   empId: number;
//   otp: string;
//   loginError: string;
//   isOTPRequested: boolean = false;
//   isOTPVerified: boolean = false;
//   data: login;
//   constructor(
//     private _admin: CommonServiceService,
//     private _router: Router,
//     private _taostr: ToastrService,
//     private modalService: NgbModal
//   ) {}

//   ngOnInit() {
//     // this._admin.reloadSeller();
//   }

//   requestOTP(data: login): void {
//     if (!data.emp_id) {
//       this.loginError = 'Please enter your employee ID';
//       return;
//     }

//     this._admin.requestOTP(data);
//     this.isOTPRequested = true;
//   }

//   verifyOTP(data: login): void {
//     const emp_id = localStorage.getItem('user')
//       ? JSON.parse(localStorage.getItem('user')).data.emp_id
//       : null;
//     if (data) {
//       this._admin.verifyOTP(data, emp_id);
//       this.isOTPVerified = true;
//       this.modalService.dismissAll();
//     } else {
//       this.loginError = 'Please enter the OTP';
//       return;
//     }
//   }
//   closeModal() {
//     this.modalService.dismissAll();
//   }
// }

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ToastrService } from 'ngx-toastr';
// import { CommonServiceService } from 'src/app/services/common-service.service';
// import { login } from 'src/data';

// @Component({
//   selector: 'app-modal',
//   templateUrl: './modal.component.html',
//   styleUrls: ['./modal.component.scss'],
// })
// export class ModalComponent {
//   empId: number = 0;
//   otpVerification: string = '';
//   loginError: string = '';
//   isOTPRequested: boolean = false;
//   isOTPVerified: boolean = false;
//   data: login;
//   isLoadingLogin: boolean = false;
//   constructor(
//     private _admin: CommonServiceService,
//     private _router: Router,
//     private _taostr: ToastrService,
//     private modalService: NgbModal
//   ) {}

//   ngOnInit() {
//     // this._admin.reloadSeller();
//   }

//   requestOTP(data: login): void {
//     if (!data.emp_id) {
//       this.loginError = 'Please enter your employee ID';
//       return;
//     }

//     this.isLoadingLogin = true;
//     try {
//       this._admin.requestOTP(data).subscribe((response) => {
//         this.isLoadingLogin = false;
//         if (response && response.success) {
//           this.isOTPRequested = true;
//         } else {
//           this.loginError = 'Failed to request OTP. Please try again.';
//         }
//       });
//     } catch (error) {
//       this.isLoadingLogin = false;
//       this.loginError = 'Failed to request OTP. Please try again.';
//       console.error('API Error: ', error);
//     }
//   }

//   verifyOTP(data: login): void {
//     this.isLoadingLogin = true;

//     const emp_id = localStorage.getItem('user')
//       ? JSON.parse(localStorage.getItem('user')).data.emp_id
//       : null;
//     try {
//       if (data) {
//         this._admin.verifyOTP(data, emp_id).subscribe((response) => {
//           this.isLoadingLogin = false; // Set loading state to false
//           if (response && response.success) {
//             localStorage.setItem('user', JSON.stringify(response));
//             console.log('User logged in successfully');
//             this._router.navigate(['/']);
//             this.modalService.dismissAll();
//             this._taostr.success('OTP Verified Successfully!', 'Success');
//           } else {
//             this.loginError = 'Error: ' + response.message;
//           }
//         });
//       }
//     } catch (error) {
//       this.isLoadingLogin = false;
//       this.loginError =
//         'Error occurred while processing your request. Please try again later.';
//       console.error('API Error: ', error);
//     }
//   }

//   closeModal() {
//     this.modalService.dismissAll();
//   }
// }
