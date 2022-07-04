import { TestBed } from '@angular/core/testing';

import { ZorroNotificationService } from './zorro-notification.service';

describe('ZorroNotificationService', () => {
  let service: ZorroNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZorroNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
