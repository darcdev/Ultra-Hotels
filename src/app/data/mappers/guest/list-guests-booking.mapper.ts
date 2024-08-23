import { Mapper } from '@/app/core/base/mappers';
import { Injectable } from '@angular/core';
import { GuestEntity } from '@/app/domain/entities/guest.entity';
import { GuestDto } from '@/app/data/dtos/guest.dto';

@Injectable({
  providedIn: 'root',
})
export class ListGuestsBookingMapper implements Mapper<GuestEntity, GuestDto> {
  mapFrom(param: GuestEntity): GuestDto {
    return {
      id: param.id,
      birth_date: param.birthDate,
      email: param.email,
      full_name: param.fullName,
      phone_number: param.phoneNumber,
      gender: param.gender,
      document_number: param.documentNumber,
      document_type: param.documentType,
      booking_id: param.booking,
    };
  }
  mapTo(param: GuestDto): GuestEntity {
    return {
      id: param.id,
      birthDate: param.birth_date,
      email: param.email,
      fullName: param.full_name,
      phoneNumber: param.phone_number,
      gender: param.gender,
      documentNumber: param.document_number,
      documentType: param.document_type,
      booking: param.booking_id,
    };
  }
}
