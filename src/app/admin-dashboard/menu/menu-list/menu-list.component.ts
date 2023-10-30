import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { CommonServiceService } from 'src/app/services/common-service.service';

interface MenuItem {
  item_name: string;
  price: number;
  _id: string;
}

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss'],
})
export class MenuListComponent implements OnInit {
  displayedColumns: string[] = ['item_name', 'price'];
  dataSource: MatTableDataSource<MenuItem>;

  constructor(private http: AdminService) {
    this.dataSource = new MatTableDataSource<MenuItem>([]);
  }

  ngOnInit(): void {
    this.getproduct();
  }

  getproduct(): void {
    this.http.addminMenuList().subscribe((response: any) => {
      if (response && response.data && response.data.items) {
        this.dataSource.data = response.data.items;
      }
    });
  }
}
