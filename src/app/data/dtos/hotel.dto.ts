import { RoomDto } from '@/app/data/dtos/room.dto';

export interface HotelDto {
  id?: string;
  name: string;
  city: string;
  country: string;
  description: string;
  additional_info_address: string;
  agencyId?: string;
  isActive?: boolean;
  rooms?: RoomDto[];
}

export interface SearchFilterDto {
  city: string | null;
  date_arrive: string | null;
  date_checkout: string | null;
  num_guests: number | null;
}
