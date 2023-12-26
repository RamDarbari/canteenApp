import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(
    public menuItems: SidebarMenuService,
    private router: Router,
    public toaster: ToastrService,
    private socketService: SocketioService,
    private toastr: ToastrService
  ) {
    this.menuData = this.menuItems.appSidebarmenu;
  }

  ngOnInit() {
    // Subscribe to socket events
    this.socketService.on('message').subscribe((data: any) => {
      console.log('Received a message from the server:', data, '');
      this.messages.push(data); // Store the message
    });

    this.socketService.on('notification').subscribe((data: any) => {
      console.log('Received a notification from the server:', data);
      this.toaster.info('Received a notification from the server:', data);
      this.messages.push(data); // Store the notification
    });
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
