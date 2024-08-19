import { Provider } from '@angular/core';

import { IInjectionFactory } from '@/app/core/interfaces/iinjection-factory';
import { AuthUserAdapter } from '@/app/domain/interfaces/auth-user-adapter';
import { AuthenticationService } from '@/app/core/services/auth/authentication.service';
import { AAuthUserSession } from '@/app/core/interfaces/aauth-user-session';
import { AuthSupabaseService } from '@/app/core/services/supabase/auth-supabase.service';

export class AuthInjectionFactory implements IInjectionFactory {
  createProviders(): Provider[] {
    return [
      {
        provide: AuthUserAdapter,
        useClass: AuthenticationService,
      },
      {
        provide: AAuthUserSession,
        useClass: AuthSupabaseService,
      },
    ];
  }
}
