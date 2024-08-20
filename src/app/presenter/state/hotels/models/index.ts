import { HotelEntity } from '@/app/domain/entities/hotel.entity';

export interface HotelStateModel {
  actualHotel: HotelEntity | null;
}
