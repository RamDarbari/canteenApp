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
    FormsModule,
    // AdminDashboardModule,
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
