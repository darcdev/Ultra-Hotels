import { Provider } from '@angular/core';

import { IInjectionFactory } from '@/app/core/interfaces/iinjection-factory';
import { IBookingRepository } from '@/app/domain/interfaces/ibooking.repository';
import { BookingRepositoryService } from '@/app/data/repositories/booking/booking-repository.service';

export class BookingInjectionFactory implements IInjectionFactory {
  createProviders(): Provider[] {
    return [
      {
        provide: IBookingRepository,
        useClass: BookingRepositoryService,
      },
    ];
  }
}
