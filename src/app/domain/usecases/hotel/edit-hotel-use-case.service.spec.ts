import { TestBed } from '@angular/core/testing';

import { EditHotelUseCaseService } from './edit-hotel-use-case.service';

describe('EditHotelUseCaseService', () => {
  let service: EditHotelUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditHotelUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
