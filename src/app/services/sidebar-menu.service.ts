import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarMenuService {
  constructor() {}

  appSidebarmenu = [
    {
      route_name: 'dashboard',
      route_icon_name: 'home',
      route_loc: '/admin/dashboard',
      route_icon_class: 'material-symbols-rounded',
    },
    {
      route_name: 'orders',
      route_icon_name: 'shopping_bag',
      route_loc: '/order',
      route_icon_class: 'material-symbols-rounded',
    },
    {
      route_name: 'custom-order',
      route_icon_name: 'add',
      route_loc: '/custom-order',
      route_icon_class: 'material-symbols-rounded',
    },
    {
      route_name: 'user-list',
      route_icon_name: 'group',
      route_loc: '/admin/userList',
      route_icon_class: 'material-symbols-rounded',
    },
    {
      route_name: 'menu',
      route_icon_name: 'restaurant_menu',
      route_loc: '/menu',
      route_icon_class: 'material-symbols-rounded',
    },
  ];
}
