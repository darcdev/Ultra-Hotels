import { Component, OnInit } from '@angular/core';
import { HotelItemComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/list-hotels/hotel-item/hotel-item.component';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { GetAllHotelsByAgentUseCaseService } from '@/app/domain/usecases/hotel/get-all-hotels-by-agent-use-case.service';
import { SessionUserService } from '@/app/presenter/views/shared/services/session-user.service';
import { SidebarModule } from 'primeng/sidebar';
import { DialogModule } from 'primeng/dialog';
import { SidebarRoomsHotelComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/sidebar-rooms-hotel/sidebar-rooms-hotel.component';

@Component({
  selector: 'app-list-hotels',
  standalone: true,
  imports: [
    HotelItemComponent,
    SidebarModule,
    DialogModule,
    SidebarRoomsHotelComponent,
  ],
  templateUrl: './list-hotels.component.html',
  styleUrl: './list-hotels.component.scss',
})
export class ListHotelsComponent implements OnInit {
  listOfHotelsByAgent: HotelEntity[] = [];

  constructor(
    private userSessionService: SessionUserService,
    private getAllHotelsByAgentUseCaseService: GetAllHotelsByAgentUseCaseService
  ) {}

  ngOnInit() {
    void this.loadAllHotelsByAgent();
  }

  async loadAllHotelsByAgent() {
    try {
      this.listOfHotelsByAgent =
        await this.getAllHotelsByAgentUseCaseService.execute(
          this.userSessionService.getUserSession()?.user.id ?? ''
        );
    } catch (error) {
      console.error('error al traer la lista de hoteles', error);
    }
  }
}
