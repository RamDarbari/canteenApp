import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CommonServiceService } from 'src/app/services/common-service.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  isActive: boolean = false;
  meals: any[] = [];

  selectedCategory: string = 'Breakfast';

  constructor(
    private _https: CommonServiceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.filterMeals();
  }

  updateSelectedCategory(category: string) {
    this.selectedCategory = category;
    console.log('Selected Category:', this.selectedCategory);
  }

  filterMeals() {
    try {
      this._https.menuList().subscribe((response) => {
        if (response.data && response.data.length > 0) {
          this.meals = response.data;
        } else {
          this.toastr.error('No meals found');
        }
      });
    } catch (error) {
      console.error(error);
      this.toastr.error(
        'An unexpected error occurred. Please try again later.'
      );
    }
  }
}
