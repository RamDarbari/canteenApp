import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { CommonServiceService } from 'src/app/services/common-service.service';

interface MenuItem {
  _id: string;
  item_name: string;
  price: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

interface MenuCategory {
  _id: string;
  title: string;
  time: string;
  items: MenuItem[];
}

@Component({
  selector: 'app-menu-catalogue',
  templateUrl: './menu-catalogue.component.html',
  styleUrls: ['./menu-catalogue.component.scss'],
})
export class MenuCatalogueComponent implements OnInit {
  menuCategories: MenuCategory[] = [];
  isLoading: boolean = false;

  constructor(private _http: AdminService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.filterSubMenuList();
  }

  filterSubMenuList() {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.isLoading = true;
      this._http
        .addminMenuList(token)
        .subscribe(
          (response) => {
            if (response.data && response.data.length > 0) {
              this.menuCategories = response.data; // Store the response in the property
            } else {
              this.toastr.error('No meals found');
            }
          },
          (error) => {
            console.error(error);
            this.toastr.error(
              'An unexpected error occurred. Please try again later.'
            );
          }
        )
        .add(() => {
          // This block will be executed when the observable is complete (success or error)
          this.isLoading = false;
        });
    } catch (error) {
      console.error(error);
      this.isLoading = false;
      this.toastr.error(
        'An unexpected error occurred. Please try again later.'
      );
    }
  }

  addTodayMenu(menuType: string, subMenuItems: string[]) {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      const payload = {
        menuType: menuType,
        sub_menu_items: subMenuItems,
      };

      this._http.addTodayMenu(token, payload).subscribe(
        (response) => {
          // Handle success response
          console.log('Menu added successfully:', response);
        },
        (error) => {
          // Handle error response
          console.error('Error adding menu:', error);
        }
      );
    } catch (error) {
      console.error(error);
      this.toastr.error(
        'An unexpected error occurred. Please try again later.'
      );
    }
  }
}
