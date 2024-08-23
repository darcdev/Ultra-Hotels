import { TestBed } from '@angular/core/testing';

import { DeleteRoomUseCaseService } from './delete-room-use-case.service';

describe('DeleteRoomUseCaseService', () => {
  let service: DeleteRoomUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteRoomUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
