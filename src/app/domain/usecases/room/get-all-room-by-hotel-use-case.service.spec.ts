import { TestBed } from '@angular/core/testing';

import { GetAllRoomsByHotelUseCaseService } from './get-all-rooms-by-hotel-use-case.service';

describe('GetAllRoomsByHotelUseCaseService', () => {
  let service: GetAllRoomsByHotelUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllRoomsByHotelUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
