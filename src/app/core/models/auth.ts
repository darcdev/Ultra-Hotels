import {
  AuthError,
  Provider,
  Session,
  UserResponse,
} from '@supabase/supabase-js';
import { UserEntity } from '@/app/domain/entities/user.entity';

export interface OAuthInfoRequest {
  provider: Provider;
}

export interface LogOutRequest {
  error: AuthError | null;
}

export interface AuthSessionResponse {
  data: { session: Session | null };
}

export interface OAuthUserMetadata {
  full_name: string;
  email: string;
}

export interface UserProfileResponse {
  profile: UserEntity;
  user: UserResponse;
}
