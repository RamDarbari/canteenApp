import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedmenusService {
  private selectedMenusSubject = new BehaviorSubject<any[]>([]);
  selectedMenus$ = this.selectedMenusSubject.asObservable();

  updateSelectedMenus(menus: any[]) {
    this.selectedMenusSubject.next(menus);
  }
}
