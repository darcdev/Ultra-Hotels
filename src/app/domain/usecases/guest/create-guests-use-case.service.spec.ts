import { TestBed } from '@angular/core/testing';

import { CreateGuestsUseCaseService } from './create-guests-use-case.service';

describe('CreateGuestsUseCaseService', () => {
  let service: CreateGuestsUseCaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateGuestsUseCaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
