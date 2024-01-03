import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CommonServiceService } from 'src/app/services/common-service.service';
import { SidebarMenuService } from 'src/app/services/sidebar-menu.service';
import { SocketioService } from 'src/app/services/socketio.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit {
  menuData: any;
  headerfullwidth: boolean = false;
  mainFullwidth: boolean = false;
  asideShrink: boolean = false;
  headerShrink: boolean = false;
  sideTitleNone: boolean = false;
  sideBottom: boolean = false;
  menuHide = false;
  messages: string[] = [];
  socketSubscription: Subscription;
  apiNotifications: any[] = [];

  constructor(
    public menuItems: SidebarMenuService,
    private router: Router,
    public toaster: ToastrService,
    private socketService: SocketioService,
    private toastr: ToastrService,
    private _https: CommonServiceService
  ) {
    this.menuData = this.menuItems.appSidebarmenu;
  }

  ngOnInit() {
    // Subscribe to socket events
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    if (token) {
      this.socketSubscription = this.socketService.on('notification').subscribe(
        (data: any) => {
          console.log('Received a notification from the server:', data);
          this.messages.unshift(data);
          this.messages = this.messages.slice(0, 5);
        },
        (error) => {
          console.error('Error receiving notification:', error);
        }
      );

      this.getApiNotifications();
    }
  }
  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  fetchApiNotifications(): void {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    try {
      if (token) {
        this._https.getApiNotifications(token).subscribe((response: any) => {
          this.handleApiNotifications(response);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getApiNotifications(): void {
    const token = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')).data.token
      : '';

    this._https.getApiNotifications(token).subscribe(
      (response: any) => {
        this.apiNotifications = response.data;
      },
      (error) => {
        console.error('Error fetching API notifications:', error);
        this.toastr.error(
          error.error.message || 'Error fetching notifications'
        );
      }
    );
  }

  private handleApiNotifications(response: any): void {
    if (response && response.statusCode === 200 && response.data) {
      const apiNotifications = response.data.notifications || [];
      // Append API notifications to the existing notifications array
      this.messages = [...apiNotifications, ...this.messages];
      this.messages = this.messages.slice(0, 5); // Limit to 5 notifications
    }
  }
  reverseChange() {
    this.headerfullwidth = false;
    this.mainFullwidth = false;
    this.asideShrink = false;
    this.headerShrink = false;
    this.sideTitleNone = false;
    this.sideBottom = false;
  }

  changeClass() {
    this.asideShrink = !this.asideShrink;
    this.headerfullwidth = !this.headerfullwidth;
    this.mainFullwidth = !this.mainFullwidth;
    this.headerShrink = !this.headerShrink;
    this.sideTitleNone = !this.sideTitleNone;
    this.sideBottom = !this.sideBottom;
    console.log(this.headerfullwidth, 'worked');
  }

  collapse() {}

  logout() {
    localStorage.clear();
    this.toaster.success('Log-out Successful');
    this.router.navigate(['/home']);
  }
}
