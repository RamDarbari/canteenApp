import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from '../routes/routes.component';
import { MenuRoutesComponent } from './menu-routes/menu-routes.component';

const routes: Routes = [
  {
    path: '',
    component: RoutesComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      {
        path: 'menu',
        component: MenuRoutesComponent,
        children: [
          { path: '', redirectTo: 'menu-catalogue', pathMatch: 'full' },
        ],
      },
    ],
  },
  // {
  //   path: '**',
  //   component: NotfoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
