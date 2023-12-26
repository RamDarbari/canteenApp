import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserRoutesComponent } from './user-routes/user-routes.component';
import { ReusableComponentModule } from 'src/app/reusable-component/reusable-component.module';
import { ProfileComponent } from './profile/profile.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { WalletHistoryComponent } from './wallet-history/wallet-history.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserRoutesComponent,
    ProfileComponent,
    OrderHistoryComponent,
    WalletHistoryComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReusableComponentModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
