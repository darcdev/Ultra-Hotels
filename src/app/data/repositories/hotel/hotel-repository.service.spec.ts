import { TestBed } from '@angular/core/testing';

import { HotelRepositoryService } from './hotel-repository.service';

describe('HotelRepositoryService', () => {
  let service: HotelRepositoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HotelRepositoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
