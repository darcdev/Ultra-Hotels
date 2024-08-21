import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';

@Component({
  selector: 'app-increment-decrement',
  templateUrl: './increment-decrement-value.component.html',
  styleUrls: ['./increment-decrement-value.component.scss'],
  standalone: true,
  imports: [IconComponent],
})
export class IncrementDecrementValueComponent {
  @Input({ required: true }) control!: FormControl;
  @Input() label = 'Items';
  @Input() max: number | null = null;
  @Input() min = 0;
  @Input() steps = 1;

  increaseValue() {
    const currentValue = this.control.value as number;

    if (this.max && currentValue >= this.max) return;
    this.control.setValue(currentValue + this.steps);
  }

  decreaseValue() {
    const currentValue = this.control.value as number;
    if (currentValue > this.min) {
      this.control.setValue(currentValue - this.steps);
    }
  }
}
