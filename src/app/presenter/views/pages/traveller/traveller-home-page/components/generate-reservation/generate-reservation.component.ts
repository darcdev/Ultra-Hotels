import { Component, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Button } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { RoomsListToReverseComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/components/generate-reservation/rooms-list-to-reverse/rooms-list-to-reverse.component';

interface GenerateReservationDynamicDialogConfig {
  hotel: HotelEntity;
}

@Component({
  selector: 'app-generate-reservation',
  standalone: true,
  imports: [CarouselModule, Button, RoomsListToReverseComponent],
  templateUrl: './generate-reservation.component.html',
  styleUrl: './generate-reservation.component.scss',
})
export class GenerateReservationComponent implements OnInit {
  rooms: RoomEntity[] = [];

  responsiveOptions: {
    breakpoint: string;
    numVisible: number;
    numScroll: number;
  }[] = [];

  constructor(
    public dynamicDialogRef: DynamicDialogRef,
    private dynamicDialogConfig: DynamicDialogConfig<GenerateReservationDynamicDialogConfig>
  ) {}

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
    ];
    this.rooms = this.dynamicDialogConfig.data?.hotel.rooms ?? [];
  }
}
