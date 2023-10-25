import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminDashboardRoutingModule } from './admin-dashboard-routing.module';
import { RoutesComponent } from './routes/routes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReusableComponentModule } from '../reusable-component/reusable-component.module';

@NgModule({
  declarations: [RoutesComponent, DashboardComponent],
  imports: [CommonModule, AdminDashboardRoutingModule, ReusableComponentModule],
})
export class AdminDashboardModule {}
