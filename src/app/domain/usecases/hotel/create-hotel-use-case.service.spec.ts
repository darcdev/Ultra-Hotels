import { TestBed } from '@angular/core/testing';

import { CreateHotelUseCaseService } from './create-hotel-use-case.service';

describe('CreateHotelUseCaseService', () => {
  let service: CreateHotelUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateHotelUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
