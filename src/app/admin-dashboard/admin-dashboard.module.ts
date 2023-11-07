import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { RoutesComponent } from './routes/routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReusableComponentModule } from '../reusable-component/reusable-component.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutletWrapperComponent } from './router-outlet-wrapper/router-outlet-wrapper.component';
@NgModule({
  declarations: [
    RoutesComponent,
    DashboardComponent,
    AdminHeaderComponent,
    UserListComponent,
    RouterOutletWrapperComponent,
  ],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ReusableComponentModule,
    NgbModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminDashboardModule {}
