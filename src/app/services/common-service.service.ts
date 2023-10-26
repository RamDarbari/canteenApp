import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderData, OrderDataItem, login } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  private apiUrl = 'http://10.8.11.160:5000';

  token!: string;
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  requestOTP(emp_id: number): Observable<any> {
    const url = `${this.apiUrl}/login`;
    const data = { emp_id };
    return this._http.post(url, data);
  }

  verifyOTP(loginData: login, token: any): Observable<any> {
    const url = `${this.apiUrl}/verifyOTP`;
    return this._http.post(url, loginData);
  }

  reloadSeller() {
    if (localStorage.getItem('user')) {
      this._router.navigate(['./login']);
    }
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
    return this._http.get('http://10.8.11.160:5000/admin/listSubMenu');
  }

  placeOrder(orderData: OrderData, token: any) {
    return this._http.post(
      'http://10.8.11.160:5000/admin/addorder',
      orderData,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}
