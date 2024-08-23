import { TestBed } from '@angular/core/testing';

import { CompleteDataUserOAuthUseCaseService } from './complete-data-user-oauth-use-case.service';

describe('CompleteDataUserOAuthUseCaseService', () => {
  let service: CompleteDataUserOAuthUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompleteDataUserOAuthUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
