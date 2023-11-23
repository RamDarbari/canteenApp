import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SidebarMenuService } from 'src/app/services/sidebar-menu.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent {
  menuData: any;
  headerfullwidth: boolean = false;
  mainFullwidth: boolean = false;
  asideShrink: boolean = false;
  headerShrink: boolean = false;
  sideTitleNone: boolean = false;
  sideBottom: boolean = false;
  menuHide = false;

  constructor(
    public menuItems: SidebarMenuService,
    private router: Router,
    public toaster: ToastrService
  ) {
    this.menuData = this.menuItems.appSidebarmenu;
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
