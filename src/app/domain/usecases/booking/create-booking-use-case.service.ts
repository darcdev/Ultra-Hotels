import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { IBookingRepository } from '@/app/domain/interfaces/ibooking.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateBookingUseCaseService
  implements UseCase<BookingEntity, BookingEntity>
{
  constructor(private _bookingRepository: IBookingRepository) {}

  async execute(bookingData: BookingEntity): Promise<BookingEntity> {
    return this._bookingRepository.createBooking(bookingData);
  }
}
