import { Injectable } from '@angular/core';
import { IHotelRepository } from '@/app/domain/interfaces/ihotel.repository';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { UseCase } from '@/app/domain/base/usecase';

@Injectable({
  providedIn: 'root',
})
export class GetHotelByIdUseCaseService
  implements UseCase<string, HotelEntity>
{
  constructor(private _hotelRepository: IHotelRepository) {}

  execute(hotelId: string): Promise<HotelEntity> {
    return this._hotelRepository.getHotel(hotelId);
  }
}
