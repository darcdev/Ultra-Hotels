import { Mapper } from '@/app/core/base/mappers';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { HotelDto } from '@/app/data/dtos/hotel.dto';
import { Injectable } from '@angular/core';
import { GetAllRoomsByHotelMapper } from '@/app/data/mappers/room/get-all-rooms-by-hotel.mapper';

@Injectable({
  providedIn: 'root',
})
export class GetHotelsByFilterMapper implements Mapper<HotelEntity, HotelDto> {
  constructor(private getAllRoomHotelMapper: GetAllRoomsByHotelMapper) {}

  mapFrom(param: HotelEntity): HotelDto {
    return {
      id: param.id,
      name: param.name,
      city: param.city,
      country: param.country,
      description: param.description,
      additional_info_address: param.additionalAdressInfo,
      latitude: param?.latitude,
      longitude: param?.longitude,
      isActive: param.isActive,
    };
  }
  mapTo(param: HotelDto): HotelEntity {
    return {
      id: param.id,
      name: param.name,
      city: param.city,
      country: param.country,
      description: param.description,
      additionalAdressInfo: param.additional_info_address,
      isActive: param.isActive,
      latitude: param?.latitude,
      longitude: param?.longitude,
      rooms: param.rooms
        ? param.rooms.map(roomDto => this.getAllRoomHotelMapper.mapTo(roomDto))
        : [],
    };
  }
}
