import { Component, Input } from '@angular/core';
import { Button, ButtonDirective } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { NgIcon } from '@ng-icons/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EditHotelModalComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/edit-new-hotel-modal/edit-hotel-modal.component';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DeleteHotelUseCaseService } from '@/app/domain/usecases/hotel/delete-hotel-use-case.service';
import { SidebarModule } from 'primeng/sidebar';
import { Store } from '@ngxs/store';
import {
  AddActualHotel,
  RemoveHotel,
} from '@/app/presenter/state/hotels/actions';

@Component({
  selector: 'app-hotel-configuration',
  standalone: true,
  imports: [
    Button,
    MenuModule,
    NgIcon,
    OverlayPanelModule,
    IconComponent,
    ButtonDirective,
    ConfirmDialogModule,
    SidebarModule,
  ],
  templateUrl: './hotel-configuration.component.html',
  styleUrl: './hotel-configuration.component.scss',
  providers: [ConfirmationService],
})
export class HotelConfigurationComponent {
  @Input({ required: true }) hotel!: HotelEntity;

  refCreateHotelModal: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private deleteHotelUseCase: DeleteHotelUseCaseService,
    private store: Store
  ) {}

  openEditHotelModal() {
    this.refCreateHotelModal = this.dialogService.open(
      EditHotelModalComponent,
      {
        header: 'Editar hotel',
        width: '50rem',
        data: {
          id: this.hotel.id,
        },
      }
    );
  }

  handleDeleteHotel(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: '¿Estas seguro de que quieres eliminar este hotel?',
      header: 'Confirmation',
      acceptLabel: 'Si, Eliminar Hotel',
      rejectLabel: 'No, Cancelar',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass:
        'p-button-text p-button-danger bg-error text-white',
      accept: async () => {
        await this.deleteHotelUseCase.execute(this.hotel.id ?? '');
        this.store.dispatch(new RemoveHotel(this.hotel.id ?? ''));
        this.messageService.add({
          severity: 'success',
          summary: 'Eliminar Hotel',
          detail: 'Se ha eliminado el hotel exitosamente',
        });
      },
    });
  }

  viewRooms() {
    this.store.dispatch(new AddActualHotel(this.hotel));
  }
}
