import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRoutesComponent } from './order-routes.component';

describe('OrderRoutesComponent', () => {
  let component: OrderRoutesComponent;
  let fixture: ComponentFixture<OrderRoutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderRoutesComponent]
    });
    fixture = TestBed.createComponent(OrderRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
