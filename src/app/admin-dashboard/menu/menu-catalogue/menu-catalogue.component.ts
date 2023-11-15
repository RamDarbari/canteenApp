import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { CommonServiceService } from 'src/app/services/common-service.service';

interface MenuItem {
  _id: string;
  item_name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface MenuCategory {
  _id: string;
  title: string;
  time: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu-catalogue',
  templateUrl: './menu-catalogue.component.html',
  styleUrls: ['./menu-catalogue.component.scss'],
})
export class MenuCatalogueComponent implements OnInit {
  menuCategories: MenuCategory[] = [];
  isLoading: boolean = false;
  isActive: boolean = false;
  totalMeals: any[] = [];

  selectedCategory: string = 'Breakfast';

  constructor(private _http: AdminService, private toastr: ToastrService) {}

  ngOnInit(): void {}

  updateSelectedCategory(category: string) {
    this.selectedCategory = category;
    console.log('Selected Category:', this.selectedCategory);
  }
}
