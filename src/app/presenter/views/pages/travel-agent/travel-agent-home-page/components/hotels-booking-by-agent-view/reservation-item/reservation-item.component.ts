import { Component, Input } from '@angular/core';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { CardModule } from 'primeng/card';
import { HotelConfigurationComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/list-hotels/hotel-configuration/hotel-configuration.component';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { PrimeTemplate } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { Button } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GuestsReservationListComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/hotels-booking-by-agent-view/guests-reservation-list/guests-reservation-list.component';

@Component({
  selector: 'app-reservation-item',
  standalone: true,
  imports: [
    CardModule,
    HotelConfigurationComponent,
    IconComponent,
    PrimeTemplate,
    TagModule,
    Button,
  ],
  templateUrl: './reservation-item.component.html',
  styleUrl: './reservation-item.component.scss',
})
export class ReservationItemComponent {
  @Input({ required: true }) reservation!: BookingEntity;

  refGuestsModal: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  viewGuestsReservation() {
    this.refGuestsModal = this.dialogService.open(
      GuestsReservationListComponent,
      {
        header: `Huespedes del ${this.reservation.rooms?.hotels?.name}`,
        width: '50rem',
        data: {
          guests: this.reservation.guests,
          reservation: this.reservation,
        },
      }
    );
  }
}
