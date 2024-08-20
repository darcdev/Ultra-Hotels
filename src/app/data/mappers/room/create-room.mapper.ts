import { Mapper } from '@/app/core/base/mappers';
import { Injectable } from '@angular/core';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { RoomDto } from '@/app/data/dtos/room.dto';

@Injectable({
  providedIn: 'root',
})
export class CreateRoomMapper implements Mapper<RoomEntity, RoomDto> {
  mapFrom(param: RoomEntity): RoomDto {
    console.log(param.hotel);
    return {
      capacity: param.capacity,
      room_number: param.roomNumber,
      base_price: param.basePrice,
      taxes: param.taxes,
      is_available: param.isAvailable,
      type: param.type,
      description: param.description,
      hotel_id: param.hotel,
    };
  }
  mapTo(param: RoomDto): RoomEntity {
    return {
      capacity: param.capacity,
      roomNumber: param.room_number,
      basePrice: param.base_price,
      taxes: param.taxes,
      isAvailable: param.is_available,
      type: param.type,
      description: param.description,
      hotel: param.hotel_id,
    };
  }
}
