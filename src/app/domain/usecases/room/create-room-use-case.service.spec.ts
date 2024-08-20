import { TestBed } from '@angular/core/testing';

import { CreateRoomUseCaseService } from './create-room-use-case.service';

describe('CreateRoomUseCaseService', () => {
  let service: CreateRoomUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRoomUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
