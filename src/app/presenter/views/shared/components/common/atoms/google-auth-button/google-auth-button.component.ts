import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-google-auth-button',
  standalone: true,
  imports: [],
  templateUrl: './google-auth-button.component.html',
  styleUrl: './google-auth-button.component.scss',
})
export class GoogleAuthButtonComponent {
  @Input({ required: true }) description = '';
  @Output() clickButton = new EventEmitter<void>();

  onClickButton() {
    this.clickButton.emit();
  }
}
