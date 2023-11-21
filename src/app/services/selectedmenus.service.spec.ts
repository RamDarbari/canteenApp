import { TestBed } from '@angular/core/testing';

import { SelectedmenusService } from './selectedmenus.service';

describe('SelectedmenusService', () => {
  let service: SelectedmenusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedmenusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
