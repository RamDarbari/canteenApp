import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  selectedCategory: string;

  constructor() {
    this.selectedCategory = this.getInitialCategory();
  }

  ngOnInit(): void {}

  private getInitialCategory(): string {
    const currentTime = new Date();
    const timeRanges = {
      Breakfast: { start: '08:00', end: '10:00' },
      Lunch: { start: '11:00', end: '14:00' },
      Snacks: { start: '16:00', end: '20:00' },
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
    return 'Breakfast';
  }
}
