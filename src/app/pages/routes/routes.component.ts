import { Component } from '@angular/core';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent {
  messages: string[] = [];
  constructor(private socketService: SocketioService) {}
  ngOnInit() {
    // Subscribe to socket events
    this.socketService.on('message').subscribe((data: any) => {
      console.log('Received a message from the server:', data);
      this.messages.push(data); // Store the message
    });
    this.socketService.on('notification').subscribe((data: any) => {
      console.log('Received a notification from the server:', data);
      this.messages.push(data); // Store the notification
    });
  }
}
