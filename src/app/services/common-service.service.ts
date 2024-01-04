import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, map, throwError } from 'rxjs';
import { OrderData, login } from 'src/data';
import { environment } from '..//../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  private secretKey = 'jwt-encryption'; // Replace with your secret key

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  private encrypt(data: any): string {
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      this.secretKey
    ).toString();
    return encryptedData;
  }

  private decrypt(encryptedData: string): any {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.secretKey);
    const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
  }

  private saveEncryptedData(key: string, data: any): void {
    const encryptedData = this.encrypt(data);
    localStorage.setItem(key, encryptedData);
  }

  private getDecryptedData(key: string): any {
    const encryptedData = localStorage.getItem(key);
    if (encryptedData) {
      return this.decrypt(encryptedData);
    }
    return null;
  }

  requestOTP(emp_id: number): Observable<any> {
    const url = `${environment.apiUrl}/user/modules/v1/auth/login`;
    const data = { emp_id };

    return this._http.post(url, data).pipe(
      catchError((error) => {
        this.toastr.error(error.error.message || 'Error in requestOTP:');
        return throwError(error);
      }),
      map((response: any) => {
        if (response.message === 'success') {
          this.saveEncryptedData('user', response.data);
        }
        return response;
      })
    );
  }

  verifyOTP(loginData: login, token: any): Observable<any> {
    const url = `${environment.apiUrl}/user/modules/v1/auth/verify-otp`;

    return this._http.post(url, loginData).pipe(
      catchError((error) => {
        this.toastr.error(
          error.error.message || error.error || 'Error in Verify-Otp:'
        );
        return throwError(error);
      }),
      map((response: any) => {
        if (response.success) {
          this.saveEncryptedData('user', response.data);
        }
        return response;
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
