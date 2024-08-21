import { GuestEntity } from '@/app/domain/entities/guest.entity';

export class BookingEntity {
  constructor(
    public dateArrive: string,
    public dateCheckout: string,
    public emergencyContactFullName: string,
    public emergencyPhone: string,
    public totalPrice: number,
    public room?: string,
    public guests?: GuestEntity[],
    public id?: string
  ) {}
}
