import { TestBed } from '@angular/core/testing';

import { SessionUserService } from './session-user.service';

describe('SessionUserServiceService', () => {
  let service: SessionUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
