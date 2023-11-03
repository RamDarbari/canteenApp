import { Component, OnInit } from '@angular/core';
import { ButtonDisabledService } from 'src/app/services/button-disabled.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedCategory: string;

  constructor(private buttonDisablerService: ButtonDisabledService) {
    this.selectedCategory = this.getInitialCategory();
  }

  ngOnInit(): void {}

  private getInitialCategory(): string {
    const currentTime = new Date();
    const timeRanges = {
      breakfast: { start: '08:00', end: '10:00' },
      lunch: { start: '11:00', end: '14:00' },
      snacks: { start: '16:00', end: '18:00' },
    };

    for (const category in timeRanges) {
      const startTime = new Date();
      startTime.setHours(Number(timeRanges[category].start.split(':')[0]));
      startTime.setMinutes(Number(timeRanges[category].start.split(':')[1]));

      const endTime = new Date();
      endTime.setHours(Number(timeRanges[category].end.split(':')[0]));
      endTime.setMinutes(Number(timeRanges[category].end.split(':')[1]));

      if (currentTime >= startTime && currentTime <= endTime) {
        return category;
      }
    }

    // Default to 'breakfast' if no category is found
    return 'snacks';
  }
  // updateSelectedCategory(category: string) {
  //   this.selectedCategory = category;
  //   console.log('Selected Category:', this.selectedCategory);
  // }
}
