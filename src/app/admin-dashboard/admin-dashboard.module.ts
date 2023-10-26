import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { RoutesComponent } from './routes/routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReusableComponentModule } from '../reusable-component/reusable-component.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';

@NgModule({
  declarations: [RoutesComponent, DashboardComponent, AdminHeaderComponent],
  imports: [CommonModule, AdminDashboardRoutingModule, ReusableComponentModule],
})
export class AdminDashboardModule {}
