import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './authentication/guard/auth.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { ModalComponent } from './reusable-component/modal/modal.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./authentication/authentication.module').then(
  //       (m) => m.AuthenticationModule
  //     ),
  // },
  {
    path: '',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: '**',
    component: NotfoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
