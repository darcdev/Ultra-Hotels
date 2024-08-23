import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { GuestEntity } from '@/app/domain/entities/guest.entity';
import { IGuestRepository } from '@/app/domain/interfaces/iguest.repository';
import { CreateGuestsBookingHotelRequest } from '@/app/core/models/guest';

@Injectable({
  providedIn: 'root',
})
export class CreateGuestsUseCaseService
  implements UseCase<CreateGuestsBookingHotelRequest, GuestEntity[]>
{
  constructor(private _guestRepository: IGuestRepository) {}

  execute(
    paramsCreateGuestsBooking: CreateGuestsBookingHotelRequest
  ): Promise<GuestEntity[]> {
    return this._guestRepository.createGuests(paramsCreateGuestsBooking);
  }
}
