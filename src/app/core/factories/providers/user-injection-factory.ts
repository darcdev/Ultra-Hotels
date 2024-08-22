import { Provider } from '@angular/core';

import { IInjectionFactory } from '@/app/core/interfaces/iinjection-factory';
import { IUserRepository } from '@/app/domain/interfaces/iuser-repository';
import { UserRepositoryService } from '@/app/data/repositories/user/user-repository.service';

export class UserInjectionFactory implements IInjectionFactory {
  createProviders(): Provider[] {
    return [
      {
        provide: IUserRepository,
        useClass: UserRepositoryService,
      },
    ];
  }
}
