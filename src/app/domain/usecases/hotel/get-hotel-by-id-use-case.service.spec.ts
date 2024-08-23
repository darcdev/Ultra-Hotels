import { TestBed } from '@angular/core/testing';

import { GetHotelByIdUseCaseService } from './get-hotel-by-id-use-case.service';

describe('GetHotelByIdUseCaseService', () => {
  let service: GetHotelByIdUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetHotelByIdUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
