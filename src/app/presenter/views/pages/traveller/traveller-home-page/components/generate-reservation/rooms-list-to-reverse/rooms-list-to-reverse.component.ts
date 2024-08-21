import { Component, Input } from '@angular/core';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { RoomHotelConfigurationComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/list-rooms/room-hotel-configuration/room-hotel-configuration.component';
import { TagModule } from 'primeng/tag';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { ButtonDirective } from 'primeng/button';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddGuestsToRoomReservationComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/components/generate-reservation/add-guests-to-room-reservation/add-guests-to-room-reservation.component';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-rooms-list-to-reverse',
  standalone: true,
  imports: [
    IconComponent,
    RoomHotelConfigurationComponent,
    TagModule,
    ButtonDirective,
    ButtonComponent,
    ToastModule,
  ],
  templateUrl: './rooms-list-to-reverse.component.html',
  styleUrl: './rooms-list-to-reverse.component.scss',
  providers: [MessageService],
})
export class RoomsListToReverseComponent {
  @Input({ required: true }) room!: RoomEntity;
  @Input({ required: true })
  dynamicGenerateReservationDialogRef!: DynamicDialogRef;

  refAddGuestToRoomReservation: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private messageService: MessageService
  ) {}

  openAddGuestsToRoomReservationModal() {
    this.refAddGuestToRoomReservation = this.dialogService.open(
      AddGuestsToRoomReservationComponent,
      {
        header: 'Completar reservación',
        width: '50rem',
        data: {
          room: this.room,
        },
      }
    );
    this.refAddGuestToRoomReservation.onClose.subscribe(
      (data: { success: boolean }) => {
        if (data?.success) {
          this.dynamicGenerateReservationDialogRef.close({
            success: true,
          });
        } else {
          this.dynamicGenerateReservationDialogRef.close({});
        }
      }
    );
  }
}
