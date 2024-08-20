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
}
