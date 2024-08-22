import { Provider } from '@angular/core';

import { IInjectionFactory } from '@/app/core/interfaces/factories/iinjection-factory';

export class NotificationInjectionFactory implements IInjectionFactory {
  createProviders(): Provider[] {
    return [
      /* {
        provide: INotificationStrategy,
        useClass: EmailNotificationService,
      },*/
    ];
  }
}
