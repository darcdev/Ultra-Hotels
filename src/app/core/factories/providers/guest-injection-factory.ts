import { Provider } from '@angular/core';

import { IInjectionFactory } from '@/app/core/interfaces/factories/iinjection-factory';
import { IGuestRepository } from '@/app/domain/interfaces/iguest.repository';
import { GuestRepositoryService } from '@/app/data/repositories/guest/guest-repository.service';

export class GuestInjectionFactory implements IInjectionFactory {
  createProviders(): Provider[] {
    return [
      {
        provide: IGuestRepository,
        useClass: GuestRepositoryService,
      },
    ];
  }
}
