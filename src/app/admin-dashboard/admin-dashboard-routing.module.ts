import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';
import { NotfoundComponent } from '../notfound/notfound.component';
import { authGuard } from './guard/auth.guard';
import { MenuCatalogueComponent } from './menu/menu-catalogue/menu-catalogue.component';

const routes: Routes = [
  {
    path: 'admin',
    component: RoutesComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'userList', component: UserListComponent },
      { path: 'menu-catalogue', component: MenuCatalogueComponent },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./orders/orders.module').then((m) => m.OrdersModule),
  },
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
