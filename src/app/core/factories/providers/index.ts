import { AuthInjectionFactory } from '@/app/core/factories/providers/auth-injection-factory';
import { Provider } from '@angular/core';
import { HotelInjectionFactory } from '@/app/core/factories/providers/hotel-injection-factory';
import { RoomInjectionFactory } from '@/app/core/factories/providers/room-injection-factory';
import { BookingInjectionFactory } from '@/app/core/factories/providers/booking-injection-factory';
import { GuestInjectionFactory } from '@/app/core/factories/providers/guest-injection-factory';

/**
 * Group all providers to inject in the application, to reduce complexity in the main module.
 */
export const getAllProviders: Provider[] = [
  ...new AuthInjectionFactory().createProviders(),
  ...new HotelInjectionFactory().createProviders(),
  ...new RoomInjectionFactory().createProviders(),
  ...new BookingInjectionFactory().createProviders(),
  ...new GuestInjectionFactory().createProviders(),
];
