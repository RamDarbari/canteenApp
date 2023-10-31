import { Component, OnInit } from '@angular/core';
import { ButtonDisabledService } from 'src/app/services/button-disabled.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isActive: boolean = false;

  selectedCategory: string = '';

  constructor(private buttonDisablerService: ButtonDisabledService) {}

  ngOnInit(): void {}

  isBreakfastDisabled(): boolean {
    return this.buttonDisablerService.isDisabled('breakfast', new Date());
  }

  isLunchDisabled(): boolean {
    return this.buttonDisablerService.isDisabled('lunch', new Date());
  }

  isSnacksDisabled(): boolean {
    return this.buttonDisablerService.isDisabled('snacks', new Date());
  }

  updateSelectedCategory(category: string) {
    this.selectedCategory = category;
    console.log('Selected Category:', this.selectedCategory);
  }
}
