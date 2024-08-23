import { Component, Input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input({ required: true }) name!: string;
  @Input() color = 'currentColor';
  @Input() size = '1.5rem';
}
