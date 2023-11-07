import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private socket: any;

  constructor() {
    // Connect to the server
    this.socket = io('http://10.8.11.160:5000'); // Replace with your server URL
  }

  public on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }
}
