import { TravelAgentLayoutComponent } from '@/app/presenter/views/shared/layouts/travel-agent-layout/travel-agent-layout.component';
import { TravelAgentPageComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/travel-agent-page.component';
import { Route } from '@angular/router';
import { AuthGuardTravelAgent } from '@/app/presenter/views/shared/guards/auth-guard-travel-agent.service';
import { environment } from '@/environments/environment.development';

export const travelAgentRoutes: Route[] = [
  {
    path: 'travel-agent',
    component: TravelAgentLayoutComponent,
    canActivate: environment.production ? [AuthGuardTravelAgent] : [],
    children: [
      {
        path: '',
        component: TravelAgentPageComponent,
      },
    ],
  },
];
