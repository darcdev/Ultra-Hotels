import { TestBed } from '@angular/core/testing';
import { SimpleUserLoginUseCaseService } from '@/app/domain/usecases/user/simple-user-login-use-case-service';

describe('SimpleUserLoginUseCaseServiceService', () => {
  let service: SimpleUserLoginUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleUserLoginUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
