import { Injectable } from '@angular/core';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { CreateBookingMapper } from '@/app/data/mappers/booking/create-booking.mapper';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';
import { IBookingRepository } from '@/app/domain/interfaces/ibooking.repository';
import { BookingDto } from '@/app/data/dtos/booking.dto';
import { BookingOperationError } from '@/app/core/validations/bookings/booking-operation-error';

@Injectable({
  providedIn: 'root',
})
export class BookingRepositoryService extends IBookingRepository {
  nameTable = 'bookings';

  constructor(
    private supabaseService: SupabaseService,
    private createBookingMapper: CreateBookingMapper
  ) {
    super();
  }

  async createBooking(booking: BookingEntity): Promise<BookingEntity> {
    const bookingDto: BookingDto = this.createBookingMapper.mapFrom(booking);

    const { data, error: bookingError } = await this.supabaseService.supabase
      .from(this.nameTable)
      .insert([
        {
          ...bookingDto,
        },
      ])
      .select()
      .single<BookingDto>();

    if (!data || bookingError) {
      throw new BookingOperationError(
        'create',
        'Error creating the booking',
        bookingError
      );
    }
    return this.createBookingMapper.mapTo(data);
  }
}
