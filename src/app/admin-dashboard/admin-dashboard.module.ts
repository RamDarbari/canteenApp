import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { RoutesComponent } from './routes/routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReusableComponentModule } from '../reusable-component/reusable-component.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    RoutesComponent,
    DashboardComponent,
    AdminHeaderComponent,
    UserListComponent,
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ReusableComponentModule,
    NgbModule,
    MatPaginatorModule,
  ],
})
export class AdminDashboardModule {}
