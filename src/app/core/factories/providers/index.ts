import { AuthInjectionFactory } from '@/app/core/factories/providers/auth-injection-factory';
import { Provider } from '@angular/core';
import { HotelInjectionFactory } from '@/app/core/factories/providers/hotel-injection-factory';
import { RoomInjectionFactory } from '@/app/core/factories/providers/room-injection-factory';

/**
 * Group all providers to inject in the application, to reduce complexity in the main module.
 */
export const getAllProviders: Provider[] = [
  ...new AuthInjectionFactory().createProviders(),
  ...new HotelInjectionFactory().createProviders(),
  ...new RoomInjectionFactory().createProviders(),
];
