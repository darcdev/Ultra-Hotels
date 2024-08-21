import { GuestDto } from '@/app/data/dtos/guest.dto';

export interface BookingDto {
  id?: string;
  date_arrive: string;
  date_checkout: string;
  emergency_contact_full_name: string;
  emergency_contact_phone: string;
  total_price: number;
  guests?: GuestDto[];
  room_id?: string;
}
