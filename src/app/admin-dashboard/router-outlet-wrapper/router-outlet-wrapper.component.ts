import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-router-outlet-wrapper',
  templateUrl: './router-outlet-wrapper.component.html',
  styleUrls: ['./router-outlet-wrapper.component.scss'],
})
export class RouterOutletWrapperComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getBodyClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (
      this.collapsed &&
      this.screenWidth <= 768 &&
      this.screenWidth > 0
    ) {
      styleClass = 'body-md-screen';
    }
    return styleClass;
  }
}
