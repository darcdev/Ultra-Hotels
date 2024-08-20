import { Injectable } from '@angular/core';
import { IHotelRepository } from '@/app/domain/interfaces/ihotel.repository';
import { UseCase } from '@/app/domain/base/usecase';

@Injectable({
  providedIn: 'root',
})
export class DeleteHotelUseCaseService implements UseCase<string, void> {
  constructor(private _hotelRepository: IHotelRepository) {}

  execute(hotelId: string): Promise<void> {
    return this._hotelRepository.deleteHotel(hotelId);
  }
}
