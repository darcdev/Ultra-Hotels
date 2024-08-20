import { Injectable } from '@angular/core';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';

import { IRoomRepository } from '@/app/domain/interfaces/iroom.repository';
import { CreateRoomMapper } from '@/app/data/mappers/room/create-room.mapper';
import { UpdateRoomMapper } from '@/app/data/mappers/room/update-room.mapper';
import { GetRoomMapper } from '@/app/data/mappers/room/get-room.mapper';
import { GetAllRoomsByHotelMapper } from '@/app/data/mappers/room/get-all-rooms-by-hotel.mapper';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { RoomOperationError } from '@/app/core/validations/rooms/room-operation.error';
import { RoomDto } from '@/app/data/dtos/room.dto';
import { UpdateRoomRequest } from '@/app/core/models/room';

@Injectable({
  providedIn: 'root',
})
export class RoomRepositoryService extends IRoomRepository {
  nameTable = 'rooms';

  constructor(
    private supabaseService: SupabaseService,
    private createRoomMapper: CreateRoomMapper,
    private updateRoomMapper: UpdateRoomMapper,
    private getRoomMapper: GetRoomMapper,
    private getAllRoomsByHotelMapper: GetAllRoomsByHotelMapper
  ) {
    super();
  }

  async createRoom(room: RoomEntity): Promise<RoomEntity> {
    const roomDto = this.createRoomMapper.mapFrom(room);

    const { data, error } = await this.supabaseService.supabase
      .from(this.nameTable)
      .insert(roomDto)
      .select()
      .single<RoomDto>();

    if (!data || error) {
      throw new RoomOperationError(
        'create',
        'Error creando una nueva habitación',
        error
      );
    }
    return this.createRoomMapper.mapTo(data);
  }

  async updateRoom(paramsEditRoom: UpdateRoomRequest): Promise<RoomEntity> {
    const roomDto = this.updateRoomMapper.mapFrom(paramsEditRoom.roomData);

    const { data, error } = await this.supabaseService.supabase
      .from(this.nameTable)
      .upsert(roomDto)
      .select()
      .single<RoomDto>();

    if (!data || error) {
      throw new RoomOperationError(
        'update',
        `Error actualizando la habitación con ID: ${paramsEditRoom.roomId}`,
        error
      );
    }
    return this.updateRoomMapper.mapTo(data);
  }

  async deleteRoom(roomId: string): Promise<void> {
    const { error } = await this.supabaseService.supabase
      .from(this.nameTable)
      .delete()
      .eq('id', roomId);

    if (error) {
      throw new RoomOperationError(
        'delete',
        `Error eliminando la habitación con ID: ${roomId}`,
        error
      );
    }
  }

  async getRoom(roomId: string): Promise<RoomEntity> {
    const { data, error } = await this.supabaseService.supabase
      .from(this.nameTable)
      .select('*')
      .eq('id', roomId)
      .single<RoomDto>();

    if (!data || error) {
      console.log(error);
      throw new RoomOperationError(
        'getById',
        `Error obteniendo la habitación con ID: ${roomId}`,
        error
      );
    }
    return this.getRoomMapper.mapTo(data);
  }

  async getRoomsByHotel(hotelId?: string): Promise<RoomEntity[]> {
    let query = this.supabaseService.supabase.from(this.nameTable).select('*');

    if (hotelId) {
      query = query.eq('hotel_id', hotelId);
    }

    const { data, error } = await query;

    if (!data || error) {
      throw new RoomOperationError(
        'getAll',
        'Error obteniendo la lista de habitaciones',
        error
      );
    }

    return data.map(this.getAllRoomsByHotelMapper.mapTo);
  }
}
