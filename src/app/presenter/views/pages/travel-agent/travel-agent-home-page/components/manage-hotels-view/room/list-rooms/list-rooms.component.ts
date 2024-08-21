import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomItemComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/list-rooms/room-item/room-item.component';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { GetAllRoomsByHotelUseCaseService } from '@/app/domain/usecases/room/get-all-rooms-by-hotel-use-case.service';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { HotelState } from '@/app/presenter/state/hotels';

@Component({
  selector: 'app-list-rooms',
  standalone: true,
  imports: [RoomItemComponent],
  templateUrl: './list-rooms.component.html',
  styleUrl: './list-rooms.component.scss',
})
export class ListRoomsComponent implements OnInit, OnDestroy {
  listRooms: RoomEntity[] = [];

  actualHotel: HotelEntity | null = null;
  actualHotel$: Observable<HotelEntity | null>;
  actualHotelSubcriber!: Subscription;

  constructor(
    private getAllRoomsByHotelUseCaseService: GetAllRoomsByHotelUseCaseService,
    private store: Store
  ) {
    this.actualHotel$ = this.store.select(HotelState.getActualHotel);
  }

  ngOnInit() {
    this.actualHotel$.subscribe(actualHotel => {
      this.actualHotel = actualHotel;
      void this.loadAllRoomsByHotel();
    });
  }

  async loadAllRoomsByHotel() {
    try {
      this.listRooms = await this.getAllRoomsByHotelUseCaseService.execute(
        this.actualHotel?.id ?? ''
      );
    } catch (error) {
      console.error('error al traer la lista de hoteles', error);
    }
  }

  ngOnDestroy() {
    this.listRooms = [];
    this.actualHotelSubcriber?.unsubscribe();
  }
}
