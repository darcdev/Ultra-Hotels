import { Component, Input } from '@angular/core';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditRoomDialogComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/edit-room-dialog/edit-room-dialog.component';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DeleteRoomUseCaseService } from '@/app/domain/usecases/room/delete-room-use-case.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Store } from '@ngxs/store';
import { RemoveRoom } from '@/app/presenter/state/rooms/actions';

@Component({
  selector: 'app-room-hotel-configuration',
  standalone: true,
  imports: [IconComponent, OverlayPanelModule, ConfirmDialogModule],
  templateUrl: './room-hotel-configuration.component.html',
  styleUrl: './room-hotel-configuration.component.scss',
  providers: [ConfirmationService],
})
export class RoomHotelConfigurationComponent {
  @Input() actualHotel!: HotelEntity | null;
  @Input() room!: RoomEntity | null;

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private deleteRoomUseCaseService: DeleteRoomUseCaseService,
    private messageService: MessageService,
    private store: Store
  ) {}
  refEditRoomModal: DynamicDialogRef | undefined;

  handleDeleteRoom(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: '¿Estas seguro de que quieres eliminar esta habitación?',
      header: 'Confirmation',
      acceptLabel: 'Si, Eliminar habitación',
      rejectLabel: 'No, Cancelar',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass:
        'p-button-text p-button-danger bg-error text-white',
      accept: async () => {
        await this.deleteRoomUseCaseService.execute(this.room?.id ?? '');
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminar habitación',
          detail: 'Se ha eliminado la habitación exitosamente',
        });
      },
    });
    this.store.dispatch(new RemoveRoom(this.room?.id ?? ''));
  }

  openEditRoomModal() {
    this.refEditRoomModal = this.dialogService.open(EditRoomDialogComponent, {
      header: 'Editar hotel',
      width: '50rem',
      data: {
        room: this.room,
      },
    });
  }
}
