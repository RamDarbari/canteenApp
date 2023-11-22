import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';
import { ModalComponent } from '../modal/modal.component';

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
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if ('menu_id' in params) {
        const menuId = params['menu_id'];
        this.getproduct(menuId);
      }
    });
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

  cancelEdit() {
    this.editedItem = null;
  }
  editProduct(menuItem: MenuItem) {
    this.editedItem = { ...menuItem };
  }

  openAddItemModal(event: Event): void {
    const modalRef = this.modalService.open(ModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
      windowClass: 'custom-modal',
    });

    // Pass the modalType to the opened modal
    modalRef.componentInstance.modalType = 'addItem-modal';
  }
}
