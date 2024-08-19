import { Injectable } from '@angular/core';
import { OAuthResponse } from '@supabase/supabase-js';
import { UseCase } from '@/app/domain/base/usecase';
import { OAuthInfoRequest } from '@/app/core/models/auth';
import { AuthUserAdapter } from '@/app/domain/interfaces/auth-user-adapter';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateUserOAuthService
  implements UseCase<OAuthInfoRequest, OAuthResponse>
{
  constructor(private _authUserAdapter: AuthUserAdapter) {}

  execute(oAuthInfoRequest: OAuthInfoRequest): Promise<OAuthResponse> {
    return this._authUserAdapter.oAuthLogin(oAuthInfoRequest);
  }
}
