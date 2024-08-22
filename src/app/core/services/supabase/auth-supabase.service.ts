import { Injectable } from '@angular/core';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';
import { IAuthUserSession } from '@/app/core/interfaces/Iauth-user-session';
import {
  AuthSessionResponse,
  UserProfileResponse,
} from '@/app/core/models/auth';
import { UserRepositoryService } from '@/app/data/repositories/user/user-repository.service';

@Injectable({
  providedIn: 'root',
})
export class AuthSupabaseService extends IAuthUserSession {
  constructor(
    private supabaseService: SupabaseService,
    private _userRepository: UserRepositoryService
  ) {
    super();
  }

  async getUser(): Promise<UserProfileResponse> {
    const user = await this.supabaseService.supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }
    const userProfile = await this._userRepository.getUserProfile(
      user?.data?.user?.id ?? ''
    );
    if (!userProfile) {
      throw new Error('User profile not found');
    }
    return {
      profile: userProfile,
      user: user,
    };
  }

  public getSession(): Promise<AuthSessionResponse | null> {
    return this.supabaseService.supabase.auth.getSession();
  }
}
