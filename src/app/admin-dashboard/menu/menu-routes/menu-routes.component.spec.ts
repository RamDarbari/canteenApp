import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRoutesComponent } from './menu-routes.component';

describe('MenuRoutesComponent', () => {
  let component: MenuRoutesComponent;
  let fixture: ComponentFixture<MenuRoutesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuRoutesComponent]
    });
    fixture = TestBed.createComponent(MenuRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
