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
})
export class TableComponent implements OnInit {
  editedItem: MenuItem | null = null;
  addProductMessage: string;
  menuItems: MenuItem[] = [];

  constructor(
    private http: AdminService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if ('menu_id' in params) {
        const menuId = params['menu_id'];
        this.getproduct(menuId);
      }
    });
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

      if (this.editedItem) {
        data._id = this.editedItem._id;
        this.http.updateItems(token, data._id, data).subscribe((result) => {
          if (result) {
            this.toastr.success('Item Updated Successfully');
            // Update or replace the item in the 'menuItems' array
            const updatedIndex = this.menuItems.findIndex(
              (item) => item._id === data._id
            );
            if (updatedIndex !== -1) {
              this.menuItems[updatedIndex] = data;
            }
          } else {
            this.toastr.error('Failed to Update Item');
          }
        });
      } else {
        this.http.addItem(data, token).subscribe((result) => {
          if (result) {
            this.toastr.success('Item Added Successfully');
            // Add the new item to the 'menuItems' array
            this.menuItems.push(data);
          } else {
            this.toastr.error('Failed to Add Item');
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  getproduct(menuId?: string) {
    if (menuId) {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';
      this.http.addminMenuList(token, menuId).subscribe((response: any) => {
        if (response && response.data && response.data.items) {
          this.menuItems = response.data.items;
        }
        this.cdr.detectChanges();
      });
    }
  }

  deleteProduct(itemId: string) {
    try {
      const token = localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).data.token
        : '';

      this.http.deleteItems(token, itemId).subscribe((response) => {
        if (response) {
          this.toastr.success('Item Deleted Successfully');
          // Remove the deleted item from the 'menuItems' array
          this.menuItems = this.menuItems.filter((item) => item._id !== itemId);
          this.cdr.detectChanges();
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
          if (result) {
            this.toastr.success('Item Updated Successfully');
            this.editedItem = null;
            this.getproduct();
            this.cdr.detectChanges();
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
