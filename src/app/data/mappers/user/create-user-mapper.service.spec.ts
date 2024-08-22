import { TestBed } from '@angular/core/testing';

import { CreateUserMapperService } from './create-user-mapper.service';

describe('CreateUserMapperService', () => {
  let service: CreateUserMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUserMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
