import { Component, Input } from '@angular/core';
import { GuestEntity } from '@/app/domain/entities/guest.entity';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'app-guest-reservation-item',
  standalone: true,
  imports: [Button, CardModule, IconComponent, PrimeTemplate],
  templateUrl: './guest-reservation-item.component.html',
  styleUrl: './guest-reservation-item.component.scss',
})
export class GuestReservationItemComponent {
  @Input({ required: true }) guest!: GuestEntity;
}
