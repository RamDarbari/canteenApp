import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  private _sidebarState: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  get sidebarState$(): Observable<boolean> {
    return this._sidebarState.asObservable();
  }

  toggleSidebar() {
    const currentState = this._sidebarState.getValue();
    this._sidebarState.next(!currentState);
  }
}
