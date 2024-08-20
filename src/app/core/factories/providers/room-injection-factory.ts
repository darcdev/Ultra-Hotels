import { Provider } from '@angular/core';

import { IInjectionFactory } from '@/app/core/interfaces/iinjection-factory';
import { IRoomRepository } from '@/app/domain/interfaces/iroom.repository';
import { RoomRepositoryService } from '@/app/data/repositories/room/room-repository.service';

export class RoomInjectionFactory implements IInjectionFactory {
  createProviders(): Provider[] {
    return [
      {
        provide: IRoomRepository,
        useClass: RoomRepositoryService,
      },
    ];
  }
}
