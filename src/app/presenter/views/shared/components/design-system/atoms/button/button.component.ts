import { Component, Input, OnInit } from '@angular/core';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [Button],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent implements OnInit {
  @Input() text = '';
  @Input() size: 'small' | 'large' | undefined;
  @Input() classStyles = '';
  @Input() variant = 'primary';

  ngOnInit() {
    console.log(this.variant);
  }
}
