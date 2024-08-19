import { TestBed } from '@angular/core/testing';

import { CreateSimpleAccountUserUseCaseService } from './create-simple-account-user-use-case.service';

describe('CreateSimpleAccountUserUseCaseService', () => {
  let service: CreateSimpleAccountUserUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateSimpleAccountUserUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
