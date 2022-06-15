import { TestBed } from '@angular/core/testing';

import { GoogleAppScriptsService } from './google-app-scripts.service';

describe('GoogleAppScriptsService', () => {
  let service: GoogleAppScriptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleAppScriptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
