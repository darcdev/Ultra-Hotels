import { UserResponse } from '@supabase/supabase-js';
import { AuthSessionResponse } from '@/app/core/models/auth';

export abstract class AAuthUserSession {
  abstract getUser(): Promise<UserResponse>;
  abstract getSession(): Promise<AuthSessionResponse | null>;
}
