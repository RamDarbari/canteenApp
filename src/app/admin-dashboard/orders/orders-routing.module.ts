import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from '../routes/routes.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NotfoundComponent } from 'src/app/notfound/notfound.component';

const routes: Routes = [
  {
    path: 'orders',
    component: RoutesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'order-details', component: OrderDetailsComponent },
      { path: 'order-history', component: OrderHistoryComponent },
      {
        path: '**',
        component: NotfoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}