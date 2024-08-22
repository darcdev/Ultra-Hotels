import { Injectable } from '@angular/core';
import { IHotelRepository } from '@/app/domain/interfaces/ihotel.repository';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';
import { CreateHotelMapper } from '@/app/data/mappers/hotel/create-hotel.mapper';
import { UpdateHotelMapper } from '@/app/data/mappers/hotel/update-hotel.mapper';
import { HotelOperationError } from '@/app/core/validations/hotels/hotel-operation.error';
import { HotelDto } from '@/app/data/dtos/hotel.dto';
import { GetAllHotelsByAgentMapper } from '@/app/data/mappers/hotel/get-all-hotels-by-agent.mapper';
import { GetHotelMapper } from '@/app/data/mappers/hotel/get-hotel.mapper';
import { UpdateHotelRequest } from '@/app/core/models/hotel';
import { HotelFilterModel } from '@/app/presenter/models/form/hotel-filter.model';
import { SearchFilterHotelMapper } from '@/app/data/mappers/hotel/search-filter-hotel.mapper';
import { GetHotelsByFilterMapper } from '@/app/data/mappers/hotel/getHotelsByFilter.mapper';

@Injectable({
  providedIn: 'root',
})
export class HotelRepositoryService extends IHotelRepository {
  nameTable = 'hotels';

  constructor(
    private supabaseService: SupabaseService,
    private createHotelMapper: CreateHotelMapper,
    private updateHotelMapper: UpdateHotelMapper,
    private getHotelMapper: GetHotelMapper,
    private getAllHotelsByAgentMapper: GetAllHotelsByAgentMapper,
    private getAllHotelByFilterMapper: GetHotelsByFilterMapper,
    private searchFilterHotelMapper: SearchFilterHotelMapper
  ) {
    super();
  }

  async createHotel(hotel: HotelEntity): Promise<HotelEntity> {
    const hotelDto = this.createHotelMapper.mapFrom(hotel);

    const { data, error } = await this.supabaseService.supabase
      .from(this.nameTable)
      .insert(hotelDto)
      .select()
      .single<HotelDto>();

    if (!data || error) {
      throw new HotelOperationError(
        'create',
        'Error creando un nuevo hotel',
        error
      );
    }
    return this.createHotelMapper.mapTo(data);
  }

  async updateHotel(paramsEditHotel: UpdateHotelRequest): Promise<HotelEntity> {
    const hotelDto = this.updateHotelMapper.mapFrom(paramsEditHotel.hotelData);

    const { data, error } = await this.supabaseService.supabase
      .from(this.nameTable)
      .upsert(hotelDto)
      .select()
      .single<HotelDto>();

    if (!data || error) {
      throw new HotelOperationError(
        'update',
        `Error actualizando el hotel con ID: ${paramsEditHotel.hotelId}`,
        error
      );
    }
    return this.updateHotelMapper.mapTo(data);
  }

  async deleteHotel(hotelId: string): Promise<void> {
    const { error } = await this.supabaseService.supabase
      .from(this.nameTable)
      .delete()
      .eq('id', hotelId);

    if (error) {
      throw new HotelOperationError(
        'delete',
        `Error eliminando el hotel con ID: ${hotelId}`,
        error
      );
    }
  }

  async getHotel(hotelId: string): Promise<HotelEntity> {
    const { data, error } = await this.supabaseService.supabase
      .from(this.nameTable)
      .select('*')
      .eq('id', hotelId)
      .single<HotelDto>();

    if (!data || error) {
      throw new HotelOperationError(
        'getById',
        `Error obteniendo el hotel con ID: ${hotelId}`,
        error
      );
    }
    return this.getHotelMapper.mapTo(data);
  }

  async getHotelsByAgency(agencyId?: string): Promise<HotelEntity[]> {
    let query = this.supabaseService.supabase.from(this.nameTable).select('*');

    if (agencyId) {
      query = query.eq('agencyId', agencyId);
    }

    const { data, error } = await query;

    if (!data || error) {
      throw new HotelOperationError(
        'getAll',
        'Error obteniendo la lista de hoteles',
        error
      );
    }

    return data.map(this.getAllHotelsByAgentMapper.mapTo);
  }

  async getHotelsByFilter(filter: HotelFilterModel): Promise<HotelEntity[]> {
    const filterDto = this.searchFilterHotelMapper.mapToDto(filter);

    /** Get booking rooms in the date range**/
    let bookedRoomsQuery = this.supabaseService.supabase
      .from('bookings')
      .select('room_id');

    if (filterDto.date_arrive && filterDto.date_checkout) {
      bookedRoomsQuery = bookedRoomsQuery
        .gte('date_arrive', filterDto.date_arrive)
        .lte('date_checkout', filterDto.date_checkout);
    }

    const bookedRooms = await bookedRoomsQuery;

    /** 1. Filter hotels by city and rooms capacity
     *  2. Remove rooms with booking id in the date range
     *  3. Remove hotels with no rooms
     * **/

    let query = this.supabaseService.supabase
      .from('hotels')
      .select(
        `
    *,
    rooms:rooms(
      *
    )
  `
      )
      .eq('isActive', true)
      .eq('rooms.is_available', true)
      .gte('rooms.capacity', filterDto.num_guests);

    if (filterDto.city) {
      query = query.eq('city', filterDto.city);
    }

    query
      .not(
        'rooms.id',
        'in',
        `(${((bookedRooms?.data as unknown as { room_id: string }[]) ?? [])
          .map((room: { room_id: string }) => room.room_id)
          .join(',')})`
      )
      .not('rooms', 'is', null);

    const { data, error } = await query;

    if (error) {
      throw new HotelOperationError(
        'getAllHotelsByFilter',
        'Error obteniendo lista hoteles por filtro',
        error
      );
    }
    const hotelDataDto = (data || []) as HotelDto[];

    return hotelDataDto.map(hotelDataDto =>
      this.getAllHotelByFilterMapper.mapTo(hotelDataDto)
    );
  }
}
