import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from '../routes/routes.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { NotfoundComponent } from 'src/app/notfound/notfound.component';
import { CustomOrderComponent } from './custom-order/custom-order.component';
import { OrderRoutesComponent } from './order-routes/order-routes.component';

const routes: Routes = [
  {
    path: '',
    component: RoutesComponent,
    children: [
      { path: '', redirectTo: 'order', pathMatch: 'full' },
      {
        path: 'order',
        component: OrderRoutesComponent,
        children: [
          {
            path: '',
            redirectTo: 'order-details',
            pathMatch: 'full',
          },
          { path: 'order-details', component: OrderDetailsComponent },
          { path: 'order-history', component: OrderHistoryComponent },
        ],
      },
      { path: 'custom-order', component: CustomOrderComponent },
      // {
      //   path: '**',
      //   component: NotfoundComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
