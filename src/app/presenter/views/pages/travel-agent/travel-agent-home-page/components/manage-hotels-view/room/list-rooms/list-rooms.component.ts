import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoomItemComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/list-rooms/room-item/room-item.component';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { GetAllRoomsByHotelUseCaseService } from '@/app/domain/usecases/room/get-all-rooms-by-hotel-use-case.service';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngxs/store';
import { HotelState } from '@/app/presenter/state/hotels';
import { RoomState } from '@/app/presenter/state/rooms';
import { SetRooms } from '@/app/presenter/state/rooms/actions';

@Component({
  selector: 'app-list-rooms',
  standalone: true,
  imports: [RoomItemComponent],
  templateUrl: './list-rooms.component.html',
  styleUrl: './list-rooms.component.scss',
})
export class ListRoomsComponent implements OnInit, OnDestroy {
  listRooms: RoomEntity[] = [];
  listRooms$: Observable<RoomEntity[] | null>;

  actualHotel: HotelEntity | null = null;
  actualHotel$: Observable<HotelEntity | null>;
  actualHotelSubcriber!: Subscription;

  constructor(
    private getAllRoomsByHotelUseCaseService: GetAllRoomsByHotelUseCaseService,
    private store: Store
  ) {
    this.listRooms$ = this.store.select(RoomState.getRooms);
    this.actualHotel$ = this.store.select(HotelState.getActualHotel);
  }

  ngOnInit() {
    this.listRooms$.subscribe(listRooms => {
      this.listRooms = listRooms ?? [];
    });
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
      this.store.dispatch(new SetRooms(this.listRooms));
    } catch (error) {
      console.error('error al traer la lista de hoteles', error);
    }
  }

  ngOnDestroy() {
    this.listRooms = [];
    this.actualHotelSubcriber?.unsubscribe();
  }
}
