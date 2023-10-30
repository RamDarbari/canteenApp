import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'admin',
    component: RoutesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'userList', component: UserListComponent },
      // {
      //   path: 'modal',
      //   component: ,
      // },
    ],
  },
  {
    path: '',
    loadChildren: () => import('./menu/menu.module').then((m) => m.MenuModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardRoutingModule {}
