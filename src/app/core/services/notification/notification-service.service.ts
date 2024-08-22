import { Injectable } from '@angular/core';
import { INotificationStrategy } from '@/app/core/interfaces/notifications/inotification-strategy';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService extends INotificationStrategy {
  constructor() {
    super();
  }
  private strategy!: INotificationStrategy;

  setStrategy(strategy: INotificationStrategy) {
    this.strategy = strategy;
  }

  override notify(infoNotification: unknown): Observable<unknown> {
    return this.strategy.notify(infoNotification);
  }
}
