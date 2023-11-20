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
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { SocketioService } from 'src/app/services/socketio.service';

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
        animate('0ms', style({ opacity: 0 })),
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
  isHovered = false;
  @Input() sidenav: boolean = true;
  @Input() adminCart: boolean = false;
  selectedMenus: any[] = [];

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
    private offcanvasService: NgbOffcanvas,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.filterMeals();
    this.sidebarService.sidebarState$.subscribe((state) => {
      this.collapsed = state;
    });
    this.fetchSelectedMenus();
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

  toggleSidebar(): void {
    if (this.screenWidth > 768) {
      this.collapsed = !this.collapsed;
      this.onToggleSideNav.emit({
        collapsed: this.collapsed,
        screenWidth: this.screenWidth,
      });
    }
  }

  fetchSelectedMenus() {
    try {
      const storedMenus =
        JSON.parse(localStorage.getItem('selectedMenus')) || {};

      // Convert storedMenus object to an array
      this.selectedMenus = Object.keys(storedMenus).map((menuId) => ({
        menuType: menuId,
        subMenuItems: storedMenus[menuId],
      }));

      console.log(
        'Fetched selectedMenus from localStorage:',
        this.selectedMenus
      );
    } catch (error) {
      console.error(
        'An unexpected error occurred while fetching selectedMenus:',
        error
      );
    }
  }

  deleteItem(menuId: string, index: number): void {
    try {
      // Fetch the selected menus from localStorage
      const storedMenus =
        JSON.parse(localStorage.getItem('selectedMenus')) || {};

      // Find the selected menu based on menuId
      const selectedMenu = storedMenus[menuId];

      if (selectedMenu && selectedMenu.length > index) {
        // Remove the item at the specified index
        selectedMenu.splice(index, 1);

        // Update the storedMenus object
        storedMenus[menuId] = selectedMenu;

        // Save the updated selectedMenus to localStorage
        localStorage.setItem('selectedMenus', JSON.stringify(storedMenus));

        // Update the selectedMenus array in your component
        this.selectedMenus = Object.entries(storedMenus).map(
          ([menuType, subMenuItems]) => ({
            menuType,
            subMenuItems,
          })
        );

        console.log(
          'Deleted item at index',
          index,
          'from menu with ID',
          menuId
        );
      } else {
        console.log(
          'Unable to delete item at index',
          index,
          'from menu with ID',
          menuId
        );
      }
    } catch (error) {
      console.error(
        'An unexpected error occurred while deleting the item:',
        error
      );
    }
  }

  todayMenu() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      // Create an array to hold each menu object
      const payload = [];

      this.selectedMenus.forEach((menu) => {
        const menuObject = {
          menuType: menu.menuType,
          sub_menu_items: menu.subMenuItems.map((item) => item.id),
        };

        // Push the menu object to the payload array
        payload.push(menuObject);
      });

      // Make the API call with the created payload
      this._https.addTodayMenu(token, payload).subscribe((response) => {
        // Handle the API response as needed
        console.log('Response from addTodayMenu API:', response);
      });
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }
}
