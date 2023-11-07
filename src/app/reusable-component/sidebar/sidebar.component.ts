import {
  trigger,
  transition,
  style,
  animate,
  keyframes,
} from '@angular/animations';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('350ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('350ms', style({ opacity: 0 })),
      ]),
    ]),
    trigger('rotate', [
      transition(':enter', [
        animate(
          '1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  activeAccordionItem: string | null = null;
  meals: any[] = [];
  selectedItemId: string | null = null;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  constructor(
    private _https: AdminService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.filterMeals();
  }

  filterMeals() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this._https.addminMenuList(token).subscribe((response) => {
        if (response.data && response.data.length > 0) {
          this.meals = response.data.map((item) => {
            return {
              menu_id: item._id,
              title: item.title,
            };
          });
          console.log(this.meals);
        } else {
          this.meals = [];
        }
        // this.cdr.detectChanges();
      });
    } catch (error) {
      console.error(error);
      this.toastr.error(
        'An unexpected error occurred. Please try again later.'
      );
      this.cdr.detectChanges();
    }
  }

  selectItem(menu_id: string) {
    this.selectedItemId = menu_id;
    console.log('Selected Item ID:', this.selectedItemId);
    this.offcanvasService.dismiss();
    this.filterMeals();
    this.router.navigate(['/menu/addProduct'], {
      queryParams: { menu_id: this.selectedItemId },
    });
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
  toggleAccordionItem(itemLabel: string) {
    if (this.activeAccordionItem === itemLabel) {
      this.activeAccordionItem = null;
    } else {
      this.activeAccordionItem = itemLabel;
    }
  }
  selectOption() {
    this.offcanvasService.dismiss();
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }
}
