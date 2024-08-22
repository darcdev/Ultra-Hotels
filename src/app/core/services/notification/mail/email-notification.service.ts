import { INotificationStrategy } from '@/app/core/interfaces/notifications/inotification-strategy';
import { Injectable } from '@angular/core';
import { EmailDto } from '@/app/core/models/dtos/email.dto';
import { HttpClient } from '@angular/common/http';
import variablesConfig from '@/app/core/config/variables';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmailNotificationService implements INotificationStrategy {
  constructor(private http: HttpClient) {}

  notify(infoNotification: EmailDto): Observable<unknown> {
    const body = {
      to: infoNotification.to,
      subject: infoNotification.subject,
      message: infoNotification.message,
      context: infoNotification.context,
    };

    return this.http.post<EmailDto>(variablesConfig.apiEmailSender, body);
  }
}
