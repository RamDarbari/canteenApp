import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MenuCatalogueComponent } from './menu-catalogue/menu-catalogue.component';
import { ReusableComponentModule } from 'src/app/reusable-component/reusable-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CdkTableModule } from '@angular/cdk/table';
import { PagesModule } from 'src/app/pages/pages.module';

@NgModule({
  declarations: [
    MenuListComponent,
    AddProductComponent,
    MenuCatalogueComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MenuRoutingModule,
    ReusableComponentModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    CdkTableModule,
    PagesModule,
  ],
  exports: [AddProductComponent],
})
export class MenuModule {}
