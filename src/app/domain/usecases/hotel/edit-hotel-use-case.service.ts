import { Injectable } from '@angular/core';
import { IHotelRepository } from '@/app/domain/interfaces/ihotel.repository';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { UseCase } from '@/app/domain/base/usecase';
import { UpdateHotelRequest } from '@/app/core/models/hotel';

@Injectable({
  providedIn: 'root',
})
export class EditHotelUseCaseService
  implements UseCase<UpdateHotelRequest, HotelEntity>
{
  constructor(private _hotelRepository: IHotelRepository) {}

  execute(paramsEditHotel: UpdateHotelRequest): Promise<HotelEntity> {
    return this._hotelRepository.updateHotel(paramsEditHotel);
  }
}
