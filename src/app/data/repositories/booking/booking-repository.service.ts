import { Injectable } from '@angular/core';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { CreateBookingMapper } from '@/app/data/mappers/booking/create-booking.mapper';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';
import { IBookingRepository } from '@/app/domain/interfaces/ibooking.repository';
import { BookingDto } from '@/app/data/dtos/booking.dto';
import { BookingOperationError } from '@/app/core/validations/bookings/booking-operation-error';
import { RoomDto } from '@/app/data/dtos/room.dto';
import { HotelDto } from '@/app/data/dtos/hotel.dto';
import { GetHotelMapper } from '@/app/data/mappers/hotel/get-hotel.mapper';
import { GetRoomMapper } from '@/app/data/mappers/room/get-room.mapper';
import { ListGuestsBookingMapper } from '@/app/data/mappers/guest/list-guests-booking.mapper';

@Injectable({
  providedIn: 'root',
})
export class BookingRepositoryService extends IBookingRepository {
  nameTable = 'bookings';

  constructor(
    private supabaseService: SupabaseService,
    private createBookingMapper: CreateBookingMapper,
    private getRoomHotelMapper: GetRoomMapper,
    private getHotelMapper: GetHotelMapper,
    private listGuestsBookingMapper: ListGuestsBookingMapper
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

  async getDetailedBookingInfoByAgent(
    agentId: string
  ): Promise<BookingEntity[]> {
    const { data, error } = await this.supabaseService.supabase
      .from(this.nameTable)
      .select(
        `
        *,
        rooms:rooms(
          *,
          hotels:hotels(
            *
          )
        ),
        guests:guests(*)
      `
      )
      .eq('rooms.hotels.agencyId', agentId);

    if (!data || error) {
      throw new BookingOperationError(
        'get detail bookings by agent',
        'Error getting the booking by specific agent',
        error
      );
    }

    /** Map the complex booking data to the BookingEntity */
    // TODO : Potencial improvement: Refactor this to a one mapper

    const dataBooking = data as unknown as BookingDto[];
    return dataBooking.map(booking => ({
      ...this.createBookingMapper.mapTo(booking),
      guests: booking.guests?.map(this.listGuestsBookingMapper.mapTo),
      rooms: {
        ...this.getRoomHotelMapper.mapTo(booking.rooms as RoomDto),
        hotels: {
          ...this.getHotelMapper.mapTo(
            (booking.rooms as RoomDto).hotels as HotelDto
          ),
        },
      },
    })) as unknown as BookingEntity[];
  }
}
