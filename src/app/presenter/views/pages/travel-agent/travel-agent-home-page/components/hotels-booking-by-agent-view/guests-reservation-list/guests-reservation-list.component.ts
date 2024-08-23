import { Component } from '@angular/core';
import { ReservationItemComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/hotels-booking-by-agent-view/reservation-item/reservation-item.component';
import { GuestEntity } from '@/app/domain/entities/guest.entity';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { GuestReservationItemComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/hotels-booking-by-agent-view/guests-reservation-list/guest-reservation-item/guest-reservation-item.component';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';

interface GuestsDynamicDialogConfigData {
  guests: GuestEntity[];
  reservation: BookingEntity;
}

@Component({
  selector: 'app-guests-reservation-list',
  standalone: true,
  imports: [
    ReservationItemComponent,
    GuestReservationItemComponent,
    IconComponent,
  ],
  templateUrl: './guests-reservation-list.component.html',
  styleUrl: './guests-reservation-list.component.scss',
})
export class GuestsReservationListComponent {
  listOfGuests: GuestEntity[] = [];
  reservation!: BookingEntity;

  constructor(
    private guestsDataDynamicDialog: DynamicDialogConfig<GuestsDynamicDialogConfigData>
  ) {
    this.listOfGuests = this.guestsDataDynamicDialog.data!.guests;
    this.reservation = this.guestsDataDynamicDialog.data!.reservation;
  }
}
