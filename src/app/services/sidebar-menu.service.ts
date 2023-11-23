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

    // {
    //   route_name: 'plans',
    //   route_icon_name: 'subscriptions',
    //   route_loc: '/home/plans',
    //   route_icon_class: 'material-symbols-rounded',
    // },
    // {
    //   route_name: 'Payments',
    //   route_icon_name: 'attach_money',
    //   route_loc: '/home/payments',
    //   route_icon_class: 'material-symbols-rounded',
    // },
    // {
    //   route_name: 'Announcements',
    //   route_icon_name: 'surround_sound',
    //   route_loc: '/home/announcements',
    //   route_icon_class: 'material-symbols-rounded',
    // },
    // {
    //   route_name: 'Manage Support Team',
    //   route_icon_name: 'help',
    //   route_loc: '/home/support-team',
    //   route_icon_class: 'material-symbols-rounded',
    // },

    // {
    //   route_name: 'communication',
    //   route_icon_name: 'contacts',
    //   route_loc: '/home/communications',
    //   route_icon_class: 'material-symbols-rounded',
    // },

    // {
    //   route_name: 'Audit Trial',
    //   route_icon_name: 'screen_record',
    //   route_loc: '/home/audit-trial',
    //   route_icon_class: 'material-symbols-rounded',
    // },
    // {
    //   route_name: 'Document center',
    //   route_icon_name: 'folder',
    //   route_loc: '/home/documents-center',
    //   route_icon_class: 'material-symbols-rounded',
    // },
    // {
    //   route_name: 'reports',
    //   route_icon_name: 'report',
    //   route_loc: '/home/reports',
    //   route_icon_class: 'material-symbols-rounded',
    // },
    // // {
    // //   route_name : "admin",
    // //   route_icon_name : "settings",
    // //   route_loc : "/home/admin",
    // //   route_icon_class : "material-symbols-rounded"
    // // },
  ];
}
