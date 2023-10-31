import { TestBed } from '@angular/core/testing';

import { ButtonDisabledService } from './button-disabled.service';

describe('ButtonDisabledService', () => {
  let service: ButtonDisabledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ButtonDisabledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
