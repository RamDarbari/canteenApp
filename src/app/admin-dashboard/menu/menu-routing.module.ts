import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from '../routes/routes.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MenuCatalogueComponent } from './menu-catalogue/menu-catalogue.component';

const routes: Routes = [
  {
    path: 'menu',
    component: RoutesComponent,
    children: [
      { path: 'menulist', component: MenuListComponent },
      { path: 'menu-catalogue', component: MenuCatalogueComponent },
      { path: 'addProduct', component: AddProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
