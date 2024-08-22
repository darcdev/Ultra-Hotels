import { Observable } from 'rxjs';

export abstract class INotificationStrategy {
  abstract notify(infoNotification: unknown): Observable<unknown>;
}
