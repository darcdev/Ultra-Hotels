import { TestBed } from '@angular/core/testing';

import { CreateBookingUseCaseService } from './create-booking-use-case.service';

describe('CreateBookingUseCaseService', () => {
  let service: CreateBookingUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateBookingUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
