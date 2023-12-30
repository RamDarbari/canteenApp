import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketioService {
  private socket: Socket;

  constructor() {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data?.token
      : null;

    this.socket = io(`https://seasia-cafe.onrender.com?token=${token}`);
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
