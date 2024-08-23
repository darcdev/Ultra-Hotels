import { BookingEntity } from '@/app/domain/entities/booking.entity';

export class GuestEntity {
  constructor(
    public fullName: string,
    public email: string,
    public phoneNumber: string,
    public birthDate: string,
    public gender: string,
    public documentType: string,
    public documentNumber: string,
    public booking?: BookingEntity['id'],
    public id?: string
  ) {}
}
