import { Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { NgIcon } from '@ng-icons/core';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { SidebarModule } from 'primeng/sidebar';
import { RemoveActualHotel } from '@/app/presenter/state/hotels/actions';
import { Store } from '@ngxs/store';
import { HotelState } from '@/app/presenter/state/hotels';
import { Observable, Subscription } from 'rxjs';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { ListRoomsComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/list-rooms/list-rooms.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateRoomDialogComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/create-room-dialog/create-room-dialog.component';

@Component({
  selector: 'app-sidebar-rooms-hotel',
  standalone: true,
  imports: [
    ButtonComponent,
    NgIcon,
    IconComponent,
    SidebarModule,
    ListRoomsComponent,
  ],
  templateUrl: './sidebar-rooms-hotel.component.html',
  styleUrl: './sidebar-rooms-hotel.component.scss',
})
export class SidebarRoomsHotelComponent implements OnInit, OnDestroy {
  actualHotel: HotelEntity | null = null;
  actualHotel$: Observable<HotelEntity | null>;
  actualHotelSubscription!: Subscription;

  refCreateRoomModal: DynamicDialogRef | undefined;
  isVisible = false;

  constructor(
    private store: Store,
    public dialogService: DialogService
  ) {
    this.actualHotel$ = this.store.select(HotelState.getActualHotel);
  }

  ngOnInit() {
    this.actualHotel$.subscribe(actualHotel => {
      if (actualHotel) {
        this.actualHotel = actualHotel;
        this.isVisible = true;
      } else {
        this.isVisible = false;
      }
    });
  }
  hideRoomSidebar() {
    this.store.dispatch(new RemoveActualHotel());
  }

  ngOnDestroy() {
    this.actualHotelSubscription?.unsubscribe();
  }

  openCreateRoomModal() {
    this.refCreateRoomModal = this.dialogService.open(
      CreateRoomDialogComponent,
      {
        header: 'Crear habitación',
        width: '50rem',
        focusOnShow: false,
        data: {
          hotel: this.actualHotel,
        },
      }
    );
  }
}
