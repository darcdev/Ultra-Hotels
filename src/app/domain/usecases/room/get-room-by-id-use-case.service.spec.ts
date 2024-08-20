import { TestBed } from '@angular/core/testing';

import { GetRoomByIdUseCaseService } from './get-room-by-id-use-case.service';

describe('GetRoomByIdUseCaseService', () => {
  let service: GetRoomByIdUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetRoomByIdUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
