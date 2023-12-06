import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutesComponent } from '../routes/routes.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { MenuCatalogueComponent } from './menu-catalogue/menu-catalogue.component';
import { MenuRoutesComponent } from './menu-routes/menu-routes.component';
import { NotfoundComponent } from 'src/app/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: RoutesComponent,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      {
        path: 'menu',
        component: MenuRoutesComponent,
        children: [
          { path: '', redirectTo: 'menu-catalogue', pathMatch: 'full' },
          // { path: 'menulist', component: MenuListComponent },
          // { path: 'menu-catalogue', component: MenuCatalogueComponent },
          // { path: 'addProduct', component: AddProductComponent },
        ],
      },
    ],
  },
  // {
  //   path: '**',
  //   component: NotfoundComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuRoutingModule {}
