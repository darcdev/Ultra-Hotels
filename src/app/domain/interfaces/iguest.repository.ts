import { GuestEntity } from '@/app/domain/entities/guest.entity';
import { CreateGuestsBookingHotelRequest } from '@/app/core/models/guest';

export abstract class IGuestRepository {
  abstract createGuests(
    paramsCreateGuestsBooking: CreateGuestsBookingHotelRequest
  ): Promise<GuestEntity[]>;
}
