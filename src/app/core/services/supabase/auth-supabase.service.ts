import { Injectable } from '@angular/core';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';
import { AAuthUserSession } from '@/app/core/interfaces/aauth-user-session';
import { UserResponse } from '@supabase/supabase-js';
import { AuthSessionResponse } from '@/app/core/models/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthSupabaseService extends AAuthUserSession {
  constructor(private supabaseService: SupabaseService) {
    super();
  }

  public getUser(): Promise<UserResponse> {
    return this.supabaseService.supabase.auth.getUser();
  }

  public getSession(): Promise<AuthSessionResponse | null> {
    return this.supabaseService.supabase.auth.getSession();
  }
}
