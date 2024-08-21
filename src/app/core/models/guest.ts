import { GuestEntity } from '@/app/domain/entities/guest.entity';

export interface CreateGuestsBookingHotelRequest {
  bookingId: string;
  guestsData: GuestEntity[];
}
