import { AuthError, Provider } from '@supabase/supabase-js';

export interface OAuthInfoRequest {
  provider: Provider;
}

export interface LogOutRequest {
  error: AuthError | null;
}
