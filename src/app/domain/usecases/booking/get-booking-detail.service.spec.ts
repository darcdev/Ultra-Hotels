import { TestBed } from '@angular/core/testing';

import { GetBookingDetailService } from './get-booking-detail.service';

describe('GetBookingDetailService', () => {
  let service: GetBookingDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBookingDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
