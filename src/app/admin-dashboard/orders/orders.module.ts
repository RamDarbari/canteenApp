import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [OrderHistoryComponent, OrderDetailsComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
  ],
})
export class OrdersModule {}
