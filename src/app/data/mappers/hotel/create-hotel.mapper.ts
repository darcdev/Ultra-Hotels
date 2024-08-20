import { Mapper } from '@/app/core/base/mappers';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { HotelDto } from '@/app/data/dtos/hotel.dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateHotelMapper implements Mapper<HotelEntity, HotelDto> {
  mapFrom(param: HotelEntity): HotelDto {
    return {
      id: param.id,
      name: param.name,
      city: param.city,
      country: param.country,
      description: param.description,
      additional_info_address: param.additionalAdressInfo,
      agencyId: param.agency,
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
      agency: param.agencyId,
    };
  }
}
