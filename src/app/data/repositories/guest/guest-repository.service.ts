import { Injectable } from '@angular/core';
import { IGuestRepository } from '@/app/domain/interfaces/iguest.repository';
import { GuestEntity } from '@/app/domain/entities/guest.entity';
import { GuestDto } from '@/app/data/dtos/guest.dto';
import { CreateGuestsBookingMapper } from '@/app/data/mappers/guest/create-guests-booking.mapper';
import { CreateGuestsBookingHotelRequest } from '@/app/core/models/guest';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';
import { GuestOperationError } from '@/app/core/validations/guests/guest-operation-error';

@Injectable({
  providedIn: 'root',
})
export class GuestRepositoryService extends IGuestRepository {
  nameTable = 'guests';

  constructor(
    private createGuestsBookingMapper: CreateGuestsBookingMapper,
    private supabaseService: SupabaseService
  ) {
    super();
  }

  async createGuests(
    paramsCreateGuestsBooking: CreateGuestsBookingHotelRequest
  ): Promise<GuestEntity[]> {
    const guestsDto: GuestDto[] = paramsCreateGuestsBooking.guestsData.map(
      guestData =>
        this.createGuestsBookingMapper.mapFrom({
          ...guestData,
          booking: paramsCreateGuestsBooking.bookingId,
        })
    );

    const { data, error: guestsError } = await this.supabaseService.supabase
      .from(this.nameTable)
      .insert(guestsDto)
      .select();

    if (!data || guestsError) {
      throw new GuestOperationError(
        'createGuests',
        'Error creating guests',
        guestsError
      );
    }
    return data.map(this.createGuestsBookingMapper.mapTo);
  }
}
