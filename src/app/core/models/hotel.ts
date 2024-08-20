import { HotelEntity } from '@/app/domain/entities/hotel.entity';

export interface UpdateHotelRequest {
  hotelId: string;
  hotelData: HotelEntity;
}
