import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SidebarService } from 'src/app/services/sidebar.service';
import { SocketioService } from 'src/app/services/socketio.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminHeaderComponent implements OnInit {
  notifications: string[] = [];
  constructor(
    private toastr: ToastrService,
    private router: Router,
    private socketService: SocketioService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.socketService.on('notification').subscribe((data) => {
      console.log('Received a notification from the server:', data);
      this.notifications.push(data);
      // Update the change detection so that the HTML is updated
      this.notifications = [...this.notifications];
    });
  }

  get userProfileDetails() {
    const userDetails = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.empDetails
      : '';
    return userDetails;
  }

  get hasToken(): boolean {
    const userJSON = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';
    return !!userJSON;
  }

  logout() {
    localStorage.clear();
    this.toastr.success('Log-out Successful');
    this.router.navigate(['/home']); // Navigate to the home page
  }
  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
