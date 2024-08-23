import { GuestEntity } from '@/app/domain/entities/guest.entity';
import { RoomEntity } from '@/app/domain/entities/room.entity';

export class BookingEntity {
  constructor(
    public dateArrive: string,
    public dateCheckout: string,
    public emergencyContactFullName: string,
    public emergencyPhone: string,
    public totalPrice: number,
    public room?: string,
    public guests?: GuestEntity[],
    public id?: string,
    public rooms?: RoomEntity
  ) {}
}
