import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent {
  messages: string[] = [];
  constructor(
    private socketService: SocketioService,
    private toastr: ToastrService
  ) {}
  ngOnInit() {}
}
