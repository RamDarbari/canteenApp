import {
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  meals: any[] = [];
  selectedItemId: string | null = null; // Variable to store the selected item's ID

  constructor(
    private _https: AdminService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private offcanvasService: NgbOffcanvas
  ) {}

  ngOnInit(): void {
    this.filterMeals();
  }

  openNoKeyboard(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { keyboard: false });
  }

  filterMeals() {
    try {
      this._https.addMenuList().subscribe((response) => {
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
        this.cdr.detectChanges();
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
}
