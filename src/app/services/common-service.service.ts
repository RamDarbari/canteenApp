import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, throwError } from 'rxjs';
import { OrderData, login } from 'src/data';
import { environment } from '..//../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  token!: string;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  requestOTP(emp_id: number): Observable<any> {
    const url = `${environment.apiUrl}/user/modules/v1/auth/login`;
    const data = { emp_id };

    return this._http.post(url, data).pipe(
      catchError((error) => {
        this.toastr.error('Error in requestOTP:');
        return throwError(error);
      })
    );
  }

  verifyOTP(loginData: login, token: any): Observable<any> {
    const url = `${environment.apiUrl}/user/modules/v1/auth/verify-otp`;

    return this._http.post(url, loginData).pipe(
      catchError((error) => {
        this.toastr.error('Error in Verify-Otp:', error);
        return throwError(error);
      })
    );
  }

  menuList(): Observable<any> {
    const url = `${environment.apiUrl}/user/modules/v1/today-menu/list-today-menu`;
    return this._http.get(url);
  }

  placeOrder(orderData: OrderData, token: any) {
    const url = `${environment.apiUrl}/user/modules/v1/order/add-order`;

    return this._http
      .post(url, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        map((response: any) => response),
        catchError((error: any) => {
          console.error('Error from backend:', error); // Log the error to the console for debugging

          if (error.error && error.error.message) {
            const errorMessage = error.error.message;
            this.toastr.error(errorMessage);
            return throwError(errorMessage);
          } else if (error.error && typeof error.error === 'object') {
            const backendError = JSON.stringify(error.error.error);
            this.toastr.error(backendError);
            return throwError(backendError);
          } else {
            const genericError = 'An error occurred.';
            this.toastr.error(genericError);
            return throwError(genericError);
          }
        })
      );
  }

  // logout(token: any) {
  //   return this._http.post('http://10.8.11.160:4000/logout', token, {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  // }

  userProfile(token: string, emp_id: number) {
    return this._http.get(
      `${environment.apiUrl}/admin/modules/v1/auth/view-employee?emp_id=${emp_id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  userProfileWithoutEmpId(token: string) {
    return this._http.get(
      `${environment.apiUrl}/admin/modules/v1/auth/view-employee`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  getApiNotifications(token: string): Observable<any> {
    const url = `${environment.apiUrl}/user/modules/v1/notification/notification-list`;
    return this._http.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
