import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  // closeResult: string;
  // itemList: menuItem[] = [];
  // token: string = '';
  // constructor(
  //   private offcanvasService: NgbOffcanvas,
  //   private _http: CommonServiceService
  // ) {}

  ngOnInit(): void {
    // this.menuListItemFetch();
  }

  // openNoKeyboard(content: TemplateRef<any>) {
  //   this.offcanvasService.open(content, { keyboard: false });
  // }

  // menuListItemFetch() {
  //   try {
  //     const token = localStorage.getItem('user')
  //       ? JSON.parse(localStorage.getItem('user')).data.token
  //       : '';
  //     this._http.menuList(token).subscribe(
  //       (response: menuItem[]) => {
  //         if (response) {
  //           this.itemList = response;
  //         }
  //       },
  //       (error) => {
  //         console.error(error);
  //       }
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
}
