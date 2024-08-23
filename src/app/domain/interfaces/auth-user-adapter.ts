import {
  LoginUserRequestDTO,
  RegisterUserRequestDTO,
} from '@/app/core/models/dtos/auth';
import { AuthResponse, OAuthResponse } from '@supabase/supabase-js';
import { LogOutRequest, OAuthInfoRequest } from '@/app/core/models/auth';

export abstract class AuthUserAdapter {
  abstract simpleLogin(
    loginUserDto: LoginUserRequestDTO
  ): Promise<AuthResponse>;
  abstract register(
    registerUserDto: RegisterUserRequestDTO
  ): Promise<AuthResponse>;
  abstract oAuthLogin(
    oAuthInfoRequest: OAuthInfoRequest
  ): Promise<OAuthResponse>;
  abstract logout(): Promise<LogOutRequest>;
}
