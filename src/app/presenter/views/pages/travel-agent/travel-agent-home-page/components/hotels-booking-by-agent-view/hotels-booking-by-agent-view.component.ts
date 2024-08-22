import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetAllBookingReservationByAgentIdService } from '@/app/domain/usecases/booking/get-all-booking-reservation-by-agent-id.service';
import { SessionUserService } from '@/app/presenter/views/shared/services/session-user.service';
import { Session } from '@supabase/supabase-js';
import { Subscription } from 'rxjs';
import { HotelItemComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/list-hotels/hotel-item/hotel-item.component';
import { SidebarRoomsHotelComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/sidebar-rooms-hotel/sidebar-rooms-hotel.component';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { ReservationItemComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/hotels-booking-by-agent-view/reservation-item/reservation-item.component';

@Component({
  selector: 'app-hotel-booking-by-agent-view',
  standalone: true,
  imports: [
    HotelItemComponent,
    SidebarRoomsHotelComponent,
    ReservationItemComponent,
  ],
  templateUrl: './hotels-booking-by-agent-view.component.html',
  styleUrls: ['./hotels-booking-by-agent-view.component.scss'],
})
export class HotelsBookingByAgentViewComponent implements OnInit, OnDestroy {
  listOfReservations: BookingEntity[] = [];

  actualSession: Session | null = null;
  private subscription!: Subscription;

  constructor(
    private getAllBookingsHotelsByAgent: GetAllBookingReservationByAgentIdService,
    private userSessionService: SessionUserService
  ) {}

  ngOnInit() {
    this.subscription = this.userSessionService.session$.subscribe({
      next: (session: Session | null) => {
        this.actualSession = session;
        this.getAllBookingsByAgent().catch(err =>
          console.error('Error fetching bookings:', err)
        );
      },
      error: err => {
        console.error('Error fetching session:', err);
      },
    });
  }

  private async getAllBookingsByAgent() {
    const userId = this.userSessionService.getUserSession()?.user.id;
    if (userId) {
      try {
        this.listOfReservations =
          await this.getAllBookingsHotelsByAgent.execute(userId);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      }
    } else {
      console.warn('User ID not found in session');
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
