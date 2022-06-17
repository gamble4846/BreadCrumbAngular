import { TestBed } from '@angular/core/testing';

import { DataProvidersService } from './data-providers.service';

describe('DataProvidersService', () => {
  let service: DataProvidersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataProvidersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
