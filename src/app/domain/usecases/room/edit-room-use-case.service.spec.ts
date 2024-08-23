import { TestBed } from '@angular/core/testing';

import { EditRoomUseCaseService } from './edit-room-use-case.service';

describe('EditRoomUseCaseService', () => {
  let service: EditRoomUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditRoomUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
