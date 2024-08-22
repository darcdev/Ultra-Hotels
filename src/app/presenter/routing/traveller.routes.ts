import { TravellerLayoutComponent } from '@/app/presenter/views/shared/layouts/traveller-layout/traveller-layout.component';
import { TravellerHomePageComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/traveller-home-page.component';
import { Route } from '@angular/router';

export const travellerRoutes: Route[] = [
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
];
