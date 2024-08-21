import { Routes } from '@angular/router';
import { TravelAgentLayoutComponent } from '@/app/presenter/views/shared/layouts/travel-agent-layout/travel-agent-layout.component';
import { TravelAgentPageComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/travel-agent-page.component';
import { TravellerLayoutComponent } from '@/app/presenter/views/shared/layouts/traveller-layout/traveller-layout.component';
import { TravellerHomePageComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/traveller-home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: TravellerLayoutComponent,
    children: [
      {
        path: '',
        component: TravellerHomePageComponent,
      },
    ],
  },
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
