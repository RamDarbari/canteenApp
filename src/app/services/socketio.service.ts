// socketio.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from '..//../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private socket: Socket;

  serverUrl = `${environment.apiUrl}`;
  jwtToken = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).data?.token
    : null;

  constructor() {
    this.socket = io(this.serverUrl, {
      query: { token: this.jwtToken },
    });
  }

  public on(event: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(event, (data: any) => {
        observer.next(data);
      });
    });
  }

  public emit(event: string, data?: any): void {
    this.socket.emit(event, data);
  }
}
