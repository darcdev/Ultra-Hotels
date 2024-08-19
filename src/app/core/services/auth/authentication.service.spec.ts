import { TestBed } from '@angular/core/testing';
import { AuthenticationService } from '@/app/core/services/auth/authentication.service';

describe('AuthenticationServiceService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
