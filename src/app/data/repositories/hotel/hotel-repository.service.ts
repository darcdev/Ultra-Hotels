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
    private getAllHotelsByAgentMapper: GetAllHotelsByAgentMapper
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
      query = query.eq('agency_id', agencyId);
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
}
