import { TestBed } from '@angular/core/testing';

import { AuthenticateUserOAuthService } from './authenticate-user-oauth.service';

describe('AuthenticateUserOAuthService', () => {
  let service: AuthenticateUserOAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticateUserOAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
