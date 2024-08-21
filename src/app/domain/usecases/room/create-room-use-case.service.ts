import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { IRoomRepository } from '@/app/domain/interfaces/iroom.repository';
import { RoomEntity } from '@/app/domain/entities/room.entity';

@Injectable({
  providedIn: 'root',
})
export class CreateRoomUseCaseService
  implements UseCase<RoomEntity, RoomEntity>
{
  constructor(private _roomRepository: IRoomRepository) {}

  execute(roomData: RoomEntity): Promise<RoomEntity> {
    return this._roomRepository.createRoom(roomData);
  }
}
