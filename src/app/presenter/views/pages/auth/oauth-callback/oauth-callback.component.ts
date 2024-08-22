import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';
import { CompleteDataUserOAuthUseCaseService } from '@/app/domain/usecases/user/complete-data-user-oauth-use-case.service';
import { OAuthUserMetadata } from '@/app/core/models/auth';
import { fromEventPattern, take } from 'rxjs';
import { Session } from '@supabase/supabase-js';

@Component({
  selector: 'app-oauth-callback',
  standalone: true,
  imports: [],
  templateUrl: './oauth-callback.component.html',
  styleUrls: ['./oauth-callback.component.scss'],
})
export class OAuthCallbackComponent implements OnInit {
  constructor(
    private router: Router,
    private supabase: SupabaseService,
    private completeDataUserOAuthUseCase: CompleteDataUserOAuthUseCaseService
  ) {}

  ngOnInit() {
    fromEventPattern<[string, Session | null]>(handler => {
      const { data } = this.supabase.supabase.auth.onAuthStateChange(handler);
      return data.subscription?.unsubscribe.bind(data.subscription);
    })
      .pipe(take(1))
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      .subscribe(async ([, session]) => {
        if (session) {
          const user = session.user;
          const userMetadata = user.user_metadata as OAuthUserMetadata;

          await this.completeDataUserOAuthUseCase.execute({
            id: user.id,
            email: userMetadata.email,
            full_name: userMetadata.full_name,
          });

          await this.router.navigate(['']);
        } else {
          console.error('No session found, staying on callback page');
        }
      });
  }
}
