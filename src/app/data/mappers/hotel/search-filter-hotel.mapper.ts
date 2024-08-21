import { Injectable } from '@angular/core';
import { HotelFilterModel } from '@/app/presenter/models/form/hotel-filter.model';
import { SearchFilterDto } from '@/app/data/dtos/hotel.dto';

@Injectable({
  providedIn: 'root',
})
export class SearchFilterHotelMapper {
  mapToDto(param: HotelFilterModel): SearchFilterDto {
    return {
      city: param?.city,
      date_arrive: param?.dateArrive,
      date_checkout: param?.dateCheckout,
      num_guests: param?.numGuests,
    };
  }
}
