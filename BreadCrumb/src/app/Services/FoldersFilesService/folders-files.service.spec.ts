import { TestBed } from '@angular/core/testing';

import { FoldersFilesService } from './folders-files.service';

describe('FoldersFilesService', () => {
  let service: FoldersFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoldersFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
