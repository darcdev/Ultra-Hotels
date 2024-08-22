import { Provider } from '@angular/core';

import { IInjectionFactory } from '@/app/core/interfaces/factories/iinjection-factory';
import { IAuthUserSession } from '@/app/core/interfaces/auth/Iauth-user-session';
import { AuthSupabaseService } from '@/app/core/services/supabase/auth-supabase.service';

export class AuthUserSessionInjectionFactory implements IInjectionFactory {
  createProviders(): Provider[] {
    return [
      {
        provide: IAuthUserSession,
        useClass: AuthSupabaseService,
      },
    ];
  }
}
