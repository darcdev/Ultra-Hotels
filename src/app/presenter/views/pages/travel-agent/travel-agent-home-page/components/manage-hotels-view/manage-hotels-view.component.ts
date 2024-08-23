import { Component } from '@angular/core';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { NgIcon } from '@ng-icons/core';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { ListHotelsComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/list-hotels/list-hotels.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateNewHotelModalComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/create-new-hotel-modal/create-new-hotel-modal.component';

@Component({
  selector: 'app-manage-hotels-view',
  standalone: true,
  imports: [ButtonComponent, NgIcon, IconComponent, ListHotelsComponent],
  templateUrl: './manage-hotels-view.component.html',
  styleUrl: './manage-hotels-view.component.scss',
})
export class ManageHotelsViewComponent {
  refCreateHotelModal: DynamicDialogRef | undefined;
  constructor(public dialogService: DialogService) {}

  openCreateHotelModal() {
    this.refCreateHotelModal = this.dialogService.open(
      CreateNewHotelModalComponent,
      {
        header: 'Crear nuevo hotel',
        width: '50rem',
      }
    );
  }
}
