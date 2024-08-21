import { HotelFilterModel } from '@/app/presenter/models/form/hotel-filter.model';

export class AddActualSearchHotel {
  static readonly type = '[SearchHotelFilter] Add search filter';

  constructor(public payload: HotelFilterModel) {}
}

export class RemoveActualSearchHotel {
  static readonly type = '[SearchHotelFilter] Remove search filter';
}
