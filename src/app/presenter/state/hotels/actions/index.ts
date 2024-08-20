import { HotelEntity } from '@/app/domain/entities/hotel.entity';

export class AddActualHotel {
  static readonly type = '[Hotel] Add Actual';

  constructor(public payload: HotelEntity) {}
}

export class RemoveActualHotel {
  static readonly type = '[Hotel] Remove Actual';
}
