import { TestBed } from '@angular/core/testing';

import { RegistryBooksService } from './registry-books.service';

describe('RegistryBooksService', () => {
  let service: RegistryBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistryBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
