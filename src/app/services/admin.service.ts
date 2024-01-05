import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, throwError } from 'rxjs';
import { OrderDataItem, UserData } from 'src/data';
import { environment } from '..//../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private _http: HttpClient,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  addminMenuList(token: string, menuId?: string): Observable<any> {
    const apiUrl = menuId
      ? `${environment.apiUrl}/admin/modules/v1/submenu/list-submenu?menu_id=${menuId}`
      : `${environment.apiUrl}/admin/modules/v1/submenu/list-submenu`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const options = { headers };
    return this._http.get(apiUrl, options);
  }

  listmenu(token: string) {
    return this._http.get(
      `${environment.apiUrl}/admin/modules/v1/menu/list-menu`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  addItem(data: any, token: any) {
    return this._http.post(
      `${environment.apiUrl}/admin/modules/v1/submenu/add-submenu`,
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  deleteItems(token: string, _id: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this._http.delete(
      `${environment.apiUrl}/admin/modules/v1/submenu/delete-submenu?id=${_id}`,
      {
        headers,
      }
    );
  }

  updateItems(token: string, id: string, updatedData: any) {
    return this._http.put(
      `${environment.apiUrl}/admin/modules/v1/submenu/update-submenu`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  userList(token: any, currentPage: number, limit: number, search: string) {
    return this._http.get(
      `${environment.apiUrl}/admin/modules/v1/auth/employee-list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          currentPage: currentPage.toString(),
          limit: limit.toString(), // Add the limit parameter
          search: search,
        },
      }
    );
  }

  pendingOrderList(
    token: string,
    currentPage: number,
    totalRecords: number,
    totalPages: number,
    limit: number
  ) {
    return this._http.get(
      `${environment.apiUrl}/admin/modules/v1/order/pending-order`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          currentPage: currentPage.toString(),
          totalRecords: totalRecords.toString(),
          totalPages: totalPages.toString(),
          limit: limit.toString(),
        },
      }
    );
  }

  orderStatus(token: string, status: string, order_id: string) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const body = {
      order_id: order_id,
    };

    return this._http.post(
      `${environment.apiUrl}/admin/modules/v1/order/update-status?status=${status}`,
      body,
      { headers }
    );
  }

  getOrderHistory(
    token: string,
    currentPage: number,
    searchName: string,
    pageSize: number,
    download: string,
    dateInterval: string
  ) {
    return this._http.get(
      `${environment.apiUrl}/admin/modules/v1/order/list-order`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          currentPage: currentPage.toString(),
          search: searchName,
          limit: pageSize.toString(),
          download: download,
          dateInterval: dateInterval,
        },
      }
    );
  }

  getOrderHistoryExecl(
    token: string,
    currentPage: number,
    searchName: string,
    pageSize: number,
    download: string,
    dateInterval: string
  ) {
    return this._http.get(
      `${environment.apiUrl}/admin/modules/v1/order/list-order`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          currentPage: currentPage.toString(),
          search: searchName,
          limit: pageSize.toString(),
          download: download,
          dateInterval: dateInterval,
        },
        responseType: 'arraybuffer',
      }
    );
  }

  detailsCount(token: string, currentDate: string): Observable<any> {
    let date = new HttpParams().set('currentDate', currentDate);

    return this._http.get(
      `${environment.apiUrl}/admin/modules/v1/dashboard/dashboard-list`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: date,
      }
    );
  }

  addTodayMenu(token: string, payload?: any): Observable<any> {
    return this._http.post(
      `${environment.apiUrl}/admin/modules/v1/today-menu/add-today-menu`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  updateBalance(token: string, emp_id: number, payment: number, bill: number) {
    return this._http.post(
      `${environment.apiUrl}/admin/modules/v1/wallet/update-balance`,
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

  createEmployee(token: string, employeeData: UserData) {
    return this._http.post(
      `${environment.apiUrl}/admin/modules/v1/auth/create-employee`,
      employeeData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  employeeWaletDetails(
    token: string,
    empId?: number,
    currentPage = 0,
    limit = 10
  ): Observable<any> {
    let url = `${environment.apiUrl}/admin/modules/v1/wallet/wallet-history`;
    if (empId) {
      url += `?emp_id=${empId}&currentPage=${currentPage}&limit=${limit}`;
    } else {
      url += `?currentPage=${currentPage}&limit=${limit}`;
    }
    return this._http.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  deleteOrderItem(token: string, orderId: string, itemId: string) {
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        order_id: orderId,
        item_id: itemId,
      },
    };

    return this._http.delete(
      `${environment.apiUrl}/admin/modules/v1/order/delete-item`,
      options
    );
  }

}
