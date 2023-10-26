import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { RoutesComponent } from './routes/routes.component';
import { ReusableComponentModule } from '../reusable-component/reusable-component.module';
import { AboutUsComponent } from './about-us/about-us.component';

@NgModule({
  declarations: [HomeComponent, RoutesComponent, AboutUsComponent],
  imports: [CommonModule, PagesRoutingModule, ReusableComponentModule],
})
export class PagesModule {}
