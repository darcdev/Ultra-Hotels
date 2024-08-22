import { HotelDto } from '@/app/data/dtos/hotel.dto';

export interface RoomDto {
  id?: string;
  capacity: number;
  room_number: string;
  base_price: number;
  taxes: number;
  is_available?: boolean;
  type: string;
  hotel_id?: string;
  description: string;
  hotels?: HotelDto | HotelDto[];
}
