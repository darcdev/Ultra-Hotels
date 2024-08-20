import { TestBed } from '@angular/core/testing';

import { DeleteHotelUseCaseService } from './delete-hotel-use-case.service';

describe('DeleteHotelUseCaseService', () => {
  let service: DeleteHotelUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteHotelUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
