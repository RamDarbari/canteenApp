import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ButtonDisabledService {
  constructor() {}

  isDisabled(button: string, currentTime: Date): boolean {
    const timeRange = {
      breakfast: { start: '8:00', end: '10:00' },
      lunch: { start: '11:00', end: '14:00' },
      snacks: { start: '16:00', end: '18:00' },
    };

    const startTime = new Date();
    startTime.setHours(timeRange[button].start.split(':')[0]);
    startTime.setMinutes(timeRange[button].start.split(':')[1]);

    const endTime = new Date();
    endTime.setHours(timeRange[button].end.split(':')[0]);
    endTime.setMinutes(timeRange[button].end.split(':')[1]);

    return currentTime < startTime || currentTime > endTime;
  }
}
