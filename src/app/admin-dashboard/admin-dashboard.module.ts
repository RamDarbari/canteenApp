import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { RoutesComponent } from './routes/routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReusableComponentModule } from '../reusable-component/reusable-component.module';
import { UserListComponent } from './user-list/user-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
@NgModule({
  declarations: [RoutesComponent, DashboardComponent, UserListComponent],
  imports: [
    CommonModule,
    AdminDashboardRoutingModule,
    ReusableComponentModule,
    NgbModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule,
    NgChartsModule,
    MatTableModule,
    // UserModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminDashboardModule {}
