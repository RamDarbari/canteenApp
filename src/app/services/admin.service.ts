import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { OrderDataItem } from 'src/data';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = environment.apiUrl;

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  addminMenuList(token: string, menuId?: string): Observable<any> {
    const apiUrl = menuId
      ? `http://10.8.11.160:5000/admin/listSubMenu?menu_id=${menuId}`
      : 'http://10.8.11.160:5000/admin/listSubMenu';

    // Create the headers object and set the Authorization header
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Use the HttpHeaders option to set headers in the HTTP request
    const options = { headers };

    return this._http.get(apiUrl, options);
  }

  addItem(data: OrderDataItem, token: any) {
    return this._http.post(`${this.apiUrl}/admin/addSubMenu`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  deleteItems(token: string, _id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this._http.delete(`${this.apiUrl}/admin/deleteSubMenu?id=${_id}`, {
      headers,
    });
  }

  updateItems(token: string, id: string, updatedData: any) {
    return this._http
      .put(`${this.apiUrl}/admin/updateSubmenu`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        catchError((error) => {
          this.toastr.error('Error during updating items');
          return throwError(error);
        })
      );
  }

  userList(token: any, page: number, limit: number, search: string) {
    return this._http.get(`${this.apiUrl}/admin/listUsers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page.toString(),
        limit: limit.toString(), // Add the limit parameter
        search: search,
      },
    });
  }

  orderList(token: string) {
    return this._http.get(`${this.apiUrl}/admin/pendingOrderList`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  orderStatus(token: string, status: string, order_id: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      order_id: order_id,
    };

    return this._http.post(
      `${this.apiUrl}/admin/order/updateStatus?status=${status}`,
      body,
      { headers }
    );
  }

  getOrderHistory(
    token: string,
    page: number,
    searchName: string,
    pageSize: number
  ) {
    return this._http.get(`${this.apiUrl}/admin/listorder`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page: page.toString(),
        search: searchName,
        limit: pageSize.toString(), // Add page size as a parameter
      },
    });
  }

  detailsCount(token: string, currentDate: string): Observable<any> {
    let date = new HttpParams().set('currentDate', currentDate);

    return this._http.get(`${this.apiUrl}/admin/count`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: date,
    });
  }

  addTodayMenu(token: string, payload?: any): Observable<any> {
    return this._http.post(`${this.apiUrl}/admin/addTodayMenu`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  updateBalance(token: string, emp_id: number, payment: number, bill: number) {
    return this._http.post(
      `${this.apiUrl}/admin/updateBalance`,
      {
        emp_id,
        payment,
        bill,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}
