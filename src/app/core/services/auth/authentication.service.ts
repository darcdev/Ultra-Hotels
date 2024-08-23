import { Injectable } from '@angular/core';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';
import {
  LoginUserRequestDTO,
  RegisterUserRequestDTO,
} from '@/app/core/models/dtos/auth';
import { AuthResponse, OAuthResponse } from '@supabase/supabase-js';
import { AuthUserAdapter } from '@/app/domain/interfaces/auth-user-adapter';
import { LogOutRequest, OAuthInfoRequest } from '@/app/core/models/auth';
import variables from '@/app/core/config/variables';
import { ActorRoles } from '@/app/core/constants/ActorRoles';
import { UserRepositoryService } from '@/app/data/repositories/user/user-repository.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends AuthUserAdapter {
  constructor(
    private supabaseService: SupabaseService,
    private _userRepository: UserRepositoryService
  ) {
    super();
  }

  simpleLogin(loginUserDto: LoginUserRequestDTO): Promise<AuthResponse> {
    return this.supabaseService.supabase.auth.signInWithPassword({
      email: loginUserDto.email,
      password: loginUserDto.password,
    });
  }

  async register(
    registerUserDto: RegisterUserRequestDTO
  ): Promise<AuthResponse> {
    const authResponse: AuthResponse =
      await this.supabaseService.supabase.auth.signUp({
        email: registerUserDto.email,
        password: registerUserDto.password,
        options: {
          data: {
            full_name: registerUserDto.full_name,
            role: ActorRoles.TRAVELLER,
          },
        },
      });

    if (!authResponse.data || authResponse.error) {
      throw new Error('Error creating user');
    } else {
      await this._userRepository.createUserProfile({
        authUser: authResponse.data.user!.id,
        email: authResponse.data.user!.email!,
        full_name: registerUserDto.full_name,
        role: ActorRoles.TRAVELLER,
      });
    }

    return authResponse;
  }

  oAuthLogin(oAuthInfoRequest: OAuthInfoRequest): Promise<OAuthResponse> {
    return this.supabaseService.supabase.auth.signInWithOAuth({
      provider: oAuthInfoRequest.provider,
      options: {
        redirectTo: `${window.location.origin}/${variables.redirectOAuthUrl}`,
      },
    });
  }

  logout(): Promise<LogOutRequest> {
    return this.supabaseService.supabase.auth.signOut();
  }
}
