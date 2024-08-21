import { Component, Input, OnInit } from '@angular/core';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { CardModule } from 'primeng/card';
import { HotelConfigurationComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/list-hotels/hotel-configuration/hotel-configuration.component';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { PrimeTemplate } from 'primeng/api';
import { TagModule } from 'primeng/tag';
import { RoomHotelConfigurationComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/list-rooms/room-hotel-configuration/room-hotel-configuration.component';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { HotelState } from '@/app/presenter/state/hotels';

@Component({
  selector: 'app-room-item',
  standalone: true,
  imports: [
    CardModule,
    HotelConfigurationComponent,
    IconComponent,
    PrimeTemplate,
    TagModule,
    RoomHotelConfigurationComponent,
  ],
  templateUrl: './room-item.component.html',
  styleUrl: './room-item.component.scss',
})
export class RoomItemComponent implements OnInit {
  @Input() room: RoomEntity | null = null;

  actualHotel: HotelEntity | null = null;
  actualHotel$: Observable<HotelEntity | null>;

  constructor(private store: Store) {
    this.actualHotel$ = this.store.select(HotelState.getActualHotel);
  }

  ngOnInit() {
    this.actualHotel$.subscribe(actualHotel => {
      this.actualHotel = actualHotel;
    });
  }
}
