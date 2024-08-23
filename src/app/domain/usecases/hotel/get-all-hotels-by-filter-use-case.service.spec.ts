import { TestBed } from '@angular/core/testing';

import { GetAllHotelsByFilterUseCaseService } from './get-all-hotels-by-filter-use-case.service';

describe('GetAllHotelsByFilterUseCaseService', () => {
  let service: GetAllHotelsByFilterUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllHotelsByFilterUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
