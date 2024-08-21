import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { CreateGuestsUseCaseService } from '@/app/domain/usecases/guest/create-guests-use-case.service';
import { GuestEntity } from '@/app/domain/entities/guest.entity';
import { CreateBookingUseCaseService } from '@/app/domain/usecases/booking/create-booking-use-case.service';
import { BookingOperationError } from '@/app/core/validations/bookings/booking-operation-error';

@Injectable({
  providedIn: 'root',
})
export class CreateCompleteBookingUseCaseService
  implements UseCase<BookingEntity, BookingEntity>
{
  constructor(
    private createBookingUseCase: CreateBookingUseCaseService,
    private createGuestBookingsUseCase: CreateGuestsUseCaseService
  ) {}

  async execute(bookingData: BookingEntity): Promise<BookingEntity> {
    const guests: GuestEntity[] = bookingData.guests ?? [];

    const booking: BookingEntity =
      await this.createBookingUseCase.execute(bookingData);

    if (!booking.id) {
      throw new BookingOperationError(
        'create complete booking',
        'Error creating complete booking'
      );
    }

    await this.createGuestBookingsUseCase.execute({
      bookingId: booking.id,
      guestsData: guests,
    });

    return booking;
  }
}
