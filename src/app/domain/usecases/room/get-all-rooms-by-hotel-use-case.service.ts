import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { IRoomRepository } from '@/app/domain/interfaces/iroom.repository';
import { RoomEntity } from '@/app/domain/entities/room.entity';

@Injectable({
  providedIn: 'root',
})
export class GetAllRoomsByHotelUseCaseService
  implements UseCase<string, RoomEntity[]>
{
  constructor(private _roomRepository: IRoomRepository) {}

  execute(hotelId: string): Promise<RoomEntity[]> {
    return this._roomRepository.getRoomsByHotel(hotelId);
  }
}
