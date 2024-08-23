import { TestBed } from '@angular/core/testing';

import { BookingRepositoryService } from './booking-repository.service';

describe('BookingService', () => {
  let service: BookingRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
