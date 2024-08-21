import { TestBed } from '@angular/core/testing';

import { CreateCompleteBookingUseCaseService } from './create-complete-booking-use-case.service';

describe('CreateCompleteBookingUseCaseService', () => {
  let service: CreateCompleteBookingUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateCompleteBookingUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
