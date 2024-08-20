import { TestBed } from '@angular/core/testing';

import { GetAllHotelsByAgentUseCaseService } from './get-all-hotels-by-agent-use-case.service';

describe('GetAllHotelsByAgentUseCaseService', () => {
  let service: GetAllHotelsByAgentUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllHotelsByAgentUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
