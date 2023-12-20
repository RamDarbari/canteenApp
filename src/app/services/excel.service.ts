// excel.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor(private http: HttpClient) {}

  downloadExcel(): Observable<Blob> {
    // Make an HTTP GET request to your server endpoint that returns the Excel file
    return this.http.get('YOUR_SERVER_ENDPOINT', {
      responseType: 'blob',
    });
  }
}
