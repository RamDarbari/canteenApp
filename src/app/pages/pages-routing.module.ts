import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from './routes/routes.component';
import { HomeComponent } from './home/home.component';
import { ModalComponent } from '../reusable-component/modal/modal.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ProfileComponent } from '../admin-dashboard/user/profile/profile.component';
import { OrderHistoryComponent } from '../admin-dashboard/user/order-history/order-history.component';
import { WalletHistoryComponent } from '../admin-dashboard/user/wallet-history/wallet-history.component';
import { UserRoutesComponent } from './user-routes/user-routes.component';

const routes: Routes = [
  {
    path: '',
    component: RoutesComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ],
  },
  {
    path: '',
    component: UserRoutesComponent,
    children: [
      { path: '', redirectTo: 'user-profile', pathMatch: 'full' },
      {
        path: 'user-profile',
        component: ProfileComponent,
        children: [
          { path: '', redirectTo: 'history', pathMatch: 'full' },
          { path: 'history', component: OrderHistoryComponent },
          { path: 'wallet-history', component: WalletHistoryComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
