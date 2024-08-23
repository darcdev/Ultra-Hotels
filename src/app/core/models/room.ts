import { RoomEntity } from '@/app/domain/entities/room.entity';

export interface UpdateRoomRequest {
  roomId: string;
  roomData: RoomEntity;
}
