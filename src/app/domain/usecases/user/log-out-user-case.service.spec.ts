import { TestBed } from '@angular/core/testing';

import { LogOutUserCaseService } from './log-out-user-case.service';

describe('LogOutUserCaseService', () => {
  let service: LogOutUserCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogOutUserCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
