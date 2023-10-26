import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

interface MenuItem {
  _id: string;
  menu_id: string;
  item_name: string;
  price: number;
  quantity: number;
}

interface MenuResponse {
  data: {
    items: MenuItem[];
  };
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  addProductMessage: string;
  menuItems: MenuItem[] = [];
  itemId: string;

  constructor(
    private http: AdminService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getproduct();
  }

  onSubmit(data: any, addProduct: NgForm) {
    try {
      // Get itemId from query parameters
      const itemId = this.route.snapshot.queryParamMap.get('menu_id');

      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      data.menu_id = itemId;
      console.log(data.menu_id, 'ooooooo');
      this.http.addItem(data, token).subscribe((result) => {
        console.log(result);
        if (result) {
          this.toastr.success('Item Added Successfully ');
        } else {
          this.toastr.error('Failed to Add Item');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  getproduct() {
    try {
      const menuId = this.route.snapshot.queryParamMap.get('menu_id');

      if (menuId) {
        this.http.addMenuList(menuId).subscribe((response: any) => {
          console.log(response, 'response');
          if (response && response.data && response.data.items) {
            this.menuItems = response.data.items;
            console.log(this.menuItems, 'llll');
          }
          this.cdr.detectChanges();
        });
      }
    } catch (error) {
      console.error(error);
      this.cdr.detectChanges();
    }
  }

  deleteProduct(itemId: string) {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      this.http.deleteItems(token, itemId).subscribe((response) => {
        console.log(itemId);
        if (response) {
          console.log(response);
          this.toastr.success('Item Deleted Successfully');
          this.getproduct();
        } else {
          console.error('Failed To Delete The Product');
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
  editProduct() {}
}
