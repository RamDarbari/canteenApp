import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { OrderDataItem } from 'src/data';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://10.8.11.160:5000';

  constructor(
    private _http: HttpClient,
    private _router: Router,
    private toastr: ToastrService
  ) {}

  addMenuList(menuId?: string): Observable<any> {
    const apiUrl = menuId
      ? `http://10.8.11.160:5000/admin/listSubMenu?menu_id=${menuId}`
      : 'http://10.8.11.160:5000/admin/listSubMenu';

    return this._http.get(apiUrl);
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

    return this._http.delete(
      `http://10.8.11.160:5000/admin/deleteSubMenu?id=${_id}`,
      {
        headers,
      }
    );
  }

  updateItems(token: string, id: string, updatedData: any) {
    const url = `http://10.8.11.160:5000/admin/updateSubmenu/?id=${id}`;
    return this._http.put(url, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
