import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterOutletWrapperComponent } from './router-outlet-wrapper.component';

describe('RouterOutletWrapperComponent', () => {
  let component: RouterOutletWrapperComponent;
  let fixture: ComponentFixture<RouterOutletWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RouterOutletWrapperComponent]
    });
    fixture = TestBed.createComponent(RouterOutletWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
