export interface HotelDto {
  id?: string;
  name: string;
  city: string;
  country: string;
  description: string;
  additional_info_address: string;
  agencyId?: string;
  isActive?: boolean;
}
