import { TestBed } from '@angular/core/testing';

import { LocalBaseCustomService } from './local-base-custom.service';

describe('LocalBaseCustomService', () => {
  let service: LocalBaseCustomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalBaseCustomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
