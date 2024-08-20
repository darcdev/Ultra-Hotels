import { Provider } from '@angular/core';

import { IInjectionFactory } from '@/app/core/interfaces/iinjection-factory';
import { IHotelRepository } from '@/app/domain/interfaces/ihotel.repository';
import { HotelRepositoryService } from '@/app/data/repositories/hotel/hotel-repository.service';

export class HotelInjectionFactory implements IInjectionFactory {
  createProviders(): Provider[] {
    return [
      {
        provide: IHotelRepository,
        useClass: HotelRepositoryService,
      },
    ];
  }
}
