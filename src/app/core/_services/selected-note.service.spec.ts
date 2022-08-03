import { TestBed } from '@angular/core/testing';

import { SelectedNoteService } from './selected-note.service';

describe('SelectedNoteService', () => {
  let service: SelectedNoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedNoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
