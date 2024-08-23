import { BookingEntity } from '@/app/domain/entities/booking.entity';

export abstract class IBookingRepository {
  abstract createBooking(booking: BookingEntity): Promise<BookingEntity>;
  abstract getDetailedBookingInfoByAgent(
    agentId: string
  ): Promise<BookingEntity[]>;
  abstract getDetailBookingInfo(agentId: string): Promise<BookingEntity>;
}
