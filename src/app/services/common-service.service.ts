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
    const url = `${environment.apiUrl}/login`;
    const data = { emp_id };

    return this._http.post(url, data).pipe(
      catchError((error) => {
        this.toastr.error('Error in requestOTP:');
        return throwError(error);
      })
    );
  }

  verifyOTP(loginData: login, token: any): Observable<any> {
    const url = `${environment.apiUrl}/verifyOTP`;

    return this._http.post(url, loginData).pipe(
      catchError((error) => {
        this.toastr.error('Error in Verify-Otp:', error);
        return throwError(error);
      })
    );
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');

    if (user) {
      return JSON.parse(user);
    } else {
      return null;
    }
  }
  menuList(): Observable<any> {
    const url = `${environment.apiUrl}/listSubMenu`;
    return this._http.get(url);
  }

  placeOrder(orderData: OrderData, token: any) {
    const url = `${environment.apiUrl}/admin/addorder`;
    return this._http
      .post(url, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .pipe(
        map((response: any) => {
          return response;
        }),
        catchError((error: any) => {
          if (error.status === 400) {
            this.toastr.error('Bad Request');
            return throwError('Bad Request: Please check your input data.');
          } else if (error.status === 401) {
            this.toastr.error('Unauthorized: Please login and try again.');
            return throwError('Unauthorized: Please login and try again.');
          } else {
            this.toastr.error('Server Error: Try after some time!');
            return throwError('An error occurred while placing the order.');
          }
        })
      );
  }

  logout(token: any) {
    return this._http.post('http://10.8.11.160:4000/logout', token, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
