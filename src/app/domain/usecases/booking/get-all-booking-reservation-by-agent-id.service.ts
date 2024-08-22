import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { IBookingRepository } from '@/app/domain/interfaces/ibooking.repository';

@Injectable({
  providedIn: 'root',
})
export class GetAllBookingReservationByAgentIdService
  implements UseCase<string, BookingEntity[]>
{
  constructor(private _bookingRespository: IBookingRepository) {}

  execute(agentId: string): Promise<BookingEntity[]> {
    return this._bookingRespository.getDetailedBookingInfoByAgent(agentId);
  }
}
