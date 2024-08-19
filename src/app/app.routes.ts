import { Routes } from '@angular/router';
import { TravelAgentLayoutComponent } from '@/app/presenter/views/shared/layouts/travel-agent-layout/travel-agent-layout.component';
import { TravelAgentPageComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-page/travel-agent-page.component';

export const routes: Routes = [
  {
    path: 'travel-agent',
    component: TravelAgentLayoutComponent,
    children: [
      {
        path: '',
        component: TravelAgentPageComponent,
      },
    ],
  },
];
