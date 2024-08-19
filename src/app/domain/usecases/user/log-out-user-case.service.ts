import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { AuthUserAdapter } from '@/app/domain/interfaces/auth-user-adapter';
import { LogOutRequest } from '@/app/core/models/auth';

@Injectable({
  providedIn: 'root',
})
export class LogOutUserCaseService implements UseCase<void, LogOutRequest> {
  constructor(private _authUserAdapter: AuthUserAdapter) {}

  async execute(): Promise<LogOutRequest> {
    return this._authUserAdapter.logout();
  }
}
