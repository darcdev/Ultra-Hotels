import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { UpdateHotelRequest } from '@/app/core/models/hotel';

export abstract class IHotelRepository {
  abstract createHotel(hotel: HotelEntity): Promise<HotelEntity>;
  abstract updateHotel(
    paramsEditHotel: UpdateHotelRequest
  ): Promise<HotelEntity>;
  abstract deleteHotel(hotelId: string): Promise<void>;
  abstract getHotel(hotelId: string): Promise<HotelEntity>;
  abstract getHotelsByAgency(agencyId: string): Promise<HotelEntity[]>;
}
