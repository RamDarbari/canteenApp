import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { RoutesComponent } from './routes/routes.component';
import { ReusableComponentModule } from '../reusable-component/reusable-component.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { UserModule } from '../admin-dashboard/user/user.module';
import { UserRoutesComponent } from './user-routes/user-routes.component';

@NgModule({
  declarations: [
    HomeComponent,
    RoutesComponent,
    AboutUsComponent,
    UserRoutesComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReusableComponentModule,
    // UserModule,
  ],
  exports: [HomeComponent],
})
export class PagesModule {}
