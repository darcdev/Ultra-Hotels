import { Mapper } from '@/app/core/base/mappers';
import { Injectable } from '@angular/core';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { BookingDto } from '@/app/data/dtos/booking.dto';

@Injectable({
  providedIn: 'root',
})
export class ListBookingMapper implements Mapper<BookingEntity, BookingDto> {
  mapFrom(param: BookingEntity): BookingDto {
    return {
      emergency_contact_full_name: param.emergencyContactFullName,
      emergency_contact_phone: param.emergencyPhone,
      total_price: param.totalPrice,
      date_arrive: param.dateArrive,
      date_checkout: param.dateCheckout,
    };
  }
  mapTo(param: BookingDto): BookingEntity {
    return {
      emergencyContactFullName: param.emergency_contact_full_name,
      emergencyPhone: param.emergency_contact_phone,
      totalPrice: param.total_price,
      dateArrive: param.date_arrive,
      dateCheckout: param.date_checkout,
    };
  }
}
