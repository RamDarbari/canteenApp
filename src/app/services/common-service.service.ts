import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { OrderData, OrderDataItem, data, login } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {
  isuserLoggedIn = new BehaviorSubject<boolean>(false);
  isLogginFailed: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  token!: string;
  data: data[];
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private toastr: ToastrService
  ) {}
  requestOTP(data: login): Observable<any> {
    return this._http.post<any>('http://10.8.11.160:5000/login', {
      emp_id: data.emp_id,
    });
  }

  verifyOTP(data: login, empId: number): Observable<any> {
    return this._http.post<any>('http://10.8.11.160:5000/verifyOTP', {
      otp: data.otp,
      emp_id: empId,
    });
  }

  reloadSeller() {
    if (localStorage.getItem('user')) {
      this.isuserLoggedIn.next(true);
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
    return this._http.get('http://10.8.11.160:5000/admin/listMenu');
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
