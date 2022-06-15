import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoldersAndFilesComponent } from './folders-and-files.component';

describe('FoldersAndFilesComponent', () => {
  let component: FoldersAndFilesComponent;
  let fixture: ComponentFixture<FoldersAndFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoldersAndFilesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoldersAndFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
