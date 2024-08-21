import { TestBed } from '@angular/core/testing';

import { GuestRepositoryService } from './guest-repository.service';

describe('GuestRepositoryService', () => {
  let service: GuestRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuestRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
