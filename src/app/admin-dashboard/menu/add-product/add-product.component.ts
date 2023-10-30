import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  @Output() menuItemAdded = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(addProductForm: any) {
    this.menuItemAdded.emit(addProductForm.value);
  }
}
