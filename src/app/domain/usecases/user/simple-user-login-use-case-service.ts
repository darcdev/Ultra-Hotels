import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { LoginUserRequestDTO } from '@/app/core/models/dtos/auth';
import { AuthResponse } from '@supabase/supabase-js';
import { AuthUserAdapter } from '@/app/domain/interfaces/auth-user-adapter';

@Injectable({
  providedIn: 'root',
})
export class SimpleUserLoginUseCaseService
  implements UseCase<LoginUserRequestDTO, AuthResponse>
{
  constructor(private _authUserAdapter: AuthUserAdapter) {}

  async execute(loginUserData: LoginUserRequestDTO): Promise<AuthResponse> {
    return this._authUserAdapter.simpleLogin(loginUserData);
  }
}
