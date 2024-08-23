import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { IHotelRepository } from '@/app/domain/interfaces/ihotel.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAllHotelsByAgentUseCaseService
  implements UseCase<string, HotelEntity[]>
{
  constructor(private _hotelRepository: IHotelRepository) {}

  execute(agentId: string): Promise<HotelEntity[]> {
    return this._hotelRepository.getHotelsByAgency(agentId);
  }
}
