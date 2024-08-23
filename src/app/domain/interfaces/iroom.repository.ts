import { RoomEntity } from '@/app/domain/entities/room.entity';
import { UpdateRoomRequest } from '@/app/core/models/room';

export abstract class IRoomRepository {
  abstract createRoom(hotel: RoomEntity): Promise<RoomEntity>;
  abstract updateRoom(paramsEditHotel: UpdateRoomRequest): Promise<RoomEntity>;
  abstract deleteRoom(hotelId: string): Promise<void>;
  abstract getRoom(hotelId: string): Promise<RoomEntity>;
  abstract getRoomsByHotel(hotelId: string): Promise<RoomEntity[]>;
}
