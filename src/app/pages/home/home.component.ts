import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isActive: boolean = false;

  selectedCategory: string = 'Breakfast';

  constructor() {}

  ngOnInit(): void {}

  updateSelectedCategory(category: string) {
    this.selectedCategory = category;
    console.log('Selected Category:', this.selectedCategory);
  }
}
