import { AuthError, Provider, Session } from '@supabase/supabase-js';

export interface OAuthInfoRequest {
  provider: Provider;
}

export interface LogOutRequest {
  error: AuthError | null;
}

export interface AuthSessionResponse {
  data: { session: Session | null };
}
