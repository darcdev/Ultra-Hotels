import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { IHotelRepository } from '@/app/domain/interfaces/ihotel.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateHotelUseCaseService
  implements UseCase<HotelEntity, HotelEntity>
{
  constructor(private _hotelRepository: IHotelRepository) {}

  execute(hotelData: HotelEntity): Promise<HotelEntity> {
    return this._hotelRepository.createHotel(hotelData);
  }
}
