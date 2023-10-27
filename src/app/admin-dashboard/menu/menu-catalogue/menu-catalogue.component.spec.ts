import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCatalogueComponent } from './menu-catalogue.component';

describe('MenuCatalogueComponent', () => {
  let component: MenuCatalogueComponent;
  let fixture: ComponentFixture<MenuCatalogueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuCatalogueComponent]
    });
    fixture = TestBed.createComponent(MenuCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
