import { Component, Input } from '@angular/core';
import { MessageModule } from 'primeng/message';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-errors-form-messages',
  standalone: true,
  imports: [MessageModule],
  templateUrl: './errors-form-messages.component.html',
  styleUrl: './errors-form-messages.component.scss',
})
export class ErrorsFormMessagesComponent {
  @Input() control!: FormControl;
  @Input() displayName = '';

  hasErrorWhenDirty(errorCode: string): boolean {
    return (
      (this.control?.dirty || this.control?.touched) &&
      this.control.hasError(errorCode)
    );
  }

  getErrorProperty(errorCode: string, property: string): string {
    const errors = this.control.errors as Record<
      string,
      Record<string, string>
    > | null;
    return errors?.[errorCode]?.[property] ?? '';
  }
}
