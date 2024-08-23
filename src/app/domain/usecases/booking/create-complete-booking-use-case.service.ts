import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { BookingEntity } from '@/app/domain/entities/booking.entity';
import { CreateGuestsUseCaseService } from '@/app/domain/usecases/guest/create-guests-use-case.service';
import { GuestEntity } from '@/app/domain/entities/guest.entity';
import { CreateBookingUseCaseService } from '@/app/domain/usecases/booking/create-booking-use-case.service';
import { BookingOperationError } from '@/app/core/validations/bookings/booking-operation-error';
import { BookingEmailFormat } from '@/app/core/models/notification';
import { firstValueFrom } from 'rxjs';
import { NotificationService } from '@/app/core/services/notification/notification-service.service';
import { EmailNotificationService } from '@/app/core/services/notification/mail/email-notification.service';
import { SessionUserService } from '@/app/presenter/views/shared/services/session-user.service';
import { IBookingRepository } from '@/app/domain/interfaces/ibooking.repository';

@Injectable({
  providedIn: 'root',
})
export class CreateCompleteBookingUseCaseService
  implements UseCase<BookingEntity, BookingEntity>
{
  constructor(
    private createBookingUseCase: CreateBookingUseCaseService,
    private createGuestBookingsUseCase: CreateGuestsUseCaseService,
    private _notificationService: NotificationService,
    private _emailNotificationService: EmailNotificationService,
    private sessionUser: SessionUserService,
    private _bookingRepository: IBookingRepository
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

    const bookingCompleteInfo: BookingEntity =
      await this._bookingRepository.getDetailBookingInfo(booking.id);

    console.log(bookingCompleteInfo);
    this._notificationService.setStrategy(this._emailNotificationService);
    console.log(booking);

    const mailBookingData: BookingEmailFormat = {
      typeRoom: bookingCompleteInfo.rooms!.type,
      hotel: bookingCompleteInfo.rooms!.hotels!.name,
      checkIn: bookingCompleteInfo.dateArrive,
      checkOut: bookingCompleteInfo.dateCheckout,
      numGuests: bookingCompleteInfo.guests!.length,
    };

    await firstValueFrom(
      this._notificationService.notify({
        to: this.sessionUser.getUserSession()?.user.email,
        subject: 'Booking created',
        message: 'Your booking has been created',
        context: mailBookingData,
      })
    );

    return booking;
  }
}
