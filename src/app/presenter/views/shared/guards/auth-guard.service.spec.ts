import { TestBed } from '@angular/core/testing';

import { AuthGuardTravelAgent } from './auth-guard-travel-agent.service';

describe('AuthGuardService', () => {
  let service: AuthGuardTravelAgent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardTravelAgent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
