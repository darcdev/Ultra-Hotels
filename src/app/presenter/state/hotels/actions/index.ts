import { HotelEntity } from '@/app/domain/entities/hotel.entity';

export class AddActualHotel {
  static readonly type = '[Hotel] Add Actual';

  constructor(public payload: HotelEntity | null) {}
}

export class RemoveHotel {
  static readonly type = '[Hotel] Remove Hotel';
  constructor(public hotelId: string) {}
}
export class AddHotel {
  static readonly type = '[Hotel] Add Hotel';
  constructor(public payload: HotelEntity) {}
}

export class AddHotels {
  static readonly type = '[Hotel] Add Hotels';
  constructor(public payload: HotelEntity[]) {}
}

export class RemoveActualHotel {
  static readonly type = '[Hotel] Remove Actual Hotel';
}

export class EditHotel {
  static readonly type = '[Hotel] Edit Hotel';
  constructor(public payload: HotelEntity) {}
}

export class SetHotel {
  static readonly type = '[Hotel] Set Hotel';
  constructor(public payload: HotelEntity[]) {}
}
