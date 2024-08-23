import { TestBed } from '@angular/core/testing';

import { GetAllBookingReservationByAgentIdService } from './get-all-booking-reservation-by-agent-id.service';

describe('GetAllBookingReservationByAgentIdService', () => {
  let service: GetAllBookingReservationByAgentIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllBookingReservationByAgentIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
