import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { HotelFilterModel } from '@/app/presenter/models/form/hotel-filter.model';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { IHotelRepository } from '@/app/domain/interfaces/ihotel.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAllHotelsByFilterUseCaseService
  implements UseCase<HotelFilterModel, HotelEntity[]>
{
  constructor(private _hotelRepository: IHotelRepository) {}

  execute(filters: HotelFilterModel): Promise<HotelEntity[]> {
    return this._hotelRepository.getHotelsByFilter(filters);
  }
}
