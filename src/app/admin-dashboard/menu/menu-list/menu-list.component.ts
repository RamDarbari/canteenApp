import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  isActive: boolean = false;

  selectedCategory: string = 'breakfast';

  constructor() {}

  ngOnInit(): void {
    // this.filterMeals();
  }

  updateSelectedCategory(category: string) {
    this.selectedCategory = category;
    console.log('Selected Category:', this.selectedCategory);
  }
}
