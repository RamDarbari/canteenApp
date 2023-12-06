import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MealCardComponent } from './meal-card/meal-card.component';
import { TableComponent } from './table/table.component';
import { LoaderComponent } from './loader/loader.component';
import { MenuTabsComponent } from './menu-tabs/menu-tabs.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ClipboardModule } from 'ngx-clipboard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ModalComponent,
    MealCardComponent,
    TableComponent,
    LoaderComponent,
    MenuTabsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    FormsModule,
    // AdminDashboardModule,
    ScrollToModule.forRoot(),
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ClipboardModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ModalComponent,
    SidebarComponent,
    MealCardComponent,
    TableComponent,
    LoaderComponent,
    MenuTabsComponent,
  ],
})
export class ReusableComponentModule {}
