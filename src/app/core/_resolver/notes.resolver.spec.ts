import { TestBed } from '@angular/core/testing';

import { NotesResolver } from './notes.resolver';

describe('NotesResolver', () => {
  let resolver: NotesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(NotesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
