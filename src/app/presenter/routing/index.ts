import { travelAgentRoutes } from '@/app/presenter/routing/travel-agent.routes';
import { travellerRoutes } from '@/app/presenter/routing/traveller.routes';
import { authRoutes } from '@/app/presenter/routing/auth.routes';

export const appRoutes = [
  ...travelAgentRoutes,
  ...travellerRoutes,
  ...authRoutes,
];
