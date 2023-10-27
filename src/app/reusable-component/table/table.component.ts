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

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {
  editedItem: MenuItem | null = null;
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

  editProduct(menuItem: MenuItem) {
    this.editedItem = { ...menuItem };
  }

  onSubmit(data: any, addProduct: NgForm) {
    try {
      const itemId = this.route.snapshot.queryParamMap.get('menu_id');
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      data.menu_id = itemId;
      console.log(data.menu_id, 'ooooooo');

      if (this.editedItem) {
        data._id = this.editedItem._id;
        this.http.updateItems(token, data._id, data).subscribe((result) => {
          console.log(result);
          if (result) {
            this.toastr.success('Item Updated Successfully');
            this.editedItem = null;
          } else {
            this.toastr.error('Failed to Update Item');
          }
        });
      } else {
        this.http.addItem(data, token).subscribe((result) => {
          console.log(result);
          if (result) {
            this.toastr.success('Item Added Successfully');
          } else {
            this.toastr.error('Failed to Add Item');
          }
        });
      }

      // Fetch products again after addition or update
      this.getproduct();
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
  saveEditedItem() {
    if (this.editedItem) {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      const itemId = this.editedItem._id;

      this.http
        .updateItems(token, itemId, this.editedItem)
        .subscribe((result) => {
          console.log(result);
          if (result) {
            this.toastr.success('Item Updated Successfully');
            this.editedItem = null;
            this.getproduct();
          } else {
            this.toastr.error('Failed to Update Item');
          }
        });
    }
  }

  cancelEdit() {
    this.editedItem = null;
  }
}
