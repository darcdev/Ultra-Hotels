import { Route } from '@angular/router';
import { OAuthCallbackComponent } from '@/app/presenter/views/pages/auth/oauth-callback/oauth-callback.component';

export const authRoutes: Route[] = [
  {
    path: 'oauth/callback',
    component: OAuthCallbackComponent,
  },
];
