import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-routes',
  templateUrl: './user-routes.component.html',
  styleUrls: ['./user-routes.component.scss'],
})
export class UserRoutesComponent {
  @Input() empId: number;
}
