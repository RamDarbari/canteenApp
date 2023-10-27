import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MenuCatalogueComponent } from './menu-catalogue/menu-catalogue.component';
import { ReusableComponentModule } from 'src/app/reusable-component/reusable-component.module';

@NgModule({
  declarations: [
    MenuListComponent,
    AddProductComponent,
    MenuCatalogueComponent,
  ],
  imports: [CommonModule, MenuRoutingModule, ReusableComponentModule],
})
export class MenuModule {}
