import { Injectable } from '@angular/core';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';
import {
  LoginUserRequestDTO,
  RegisterUserRequestDTO,
} from '@/app/core/models/dto/auth';
import { AuthResponse, OAuthResponse } from '@supabase/supabase-js';
import { AuthUserAdapter } from '@/app/domain/interfaces/auth-user-adapter';
import { LogOutRequest, OAuthInfoRequest } from '@/app/core/models/auth';
import variables from '@/app/core/config/variables';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends AuthUserAdapter {
  constructor(private supabaseService: SupabaseService) {
    super();
  }

  simpleLogin(loginUserDto: LoginUserRequestDTO): Promise<AuthResponse> {
    return this.supabaseService.supabase.auth.signInWithPassword({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });
  }

  register(registerUserDto: RegisterUserRequestDTO): Promise<AuthResponse> {
    console.log(registerUserDto);
    return this.supabaseService.supabase.auth.signUp({
      email: registerUserDto.email,
      password: registerUserDto.password,
    });
  }

  oAuthLogin(oAuthInfoRequest: OAuthInfoRequest): Promise<OAuthResponse> {
    return this.supabaseService.supabase.auth.signInWithOAuth({
      provider: oAuthInfoRequest.provider,
      options: {
        redirectTo: variables.redirectOAuthUrl,
      },
    });
  }

  logout(): Promise<LogOutRequest> {
    return this.supabaseService.supabase.auth.signOut();
  }
}
