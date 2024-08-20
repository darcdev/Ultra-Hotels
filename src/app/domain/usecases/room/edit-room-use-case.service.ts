import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { IRoomRepository } from '@/app/domain/interfaces/iroom.repository';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { UpdateRoomRequest } from '@/app/core/models/room';

@Injectable({
  providedIn: 'root',
})
export class EditRoomUseCaseService
  implements UseCase<UpdateRoomRequest, RoomEntity>
{
  constructor(private _roomRepository: IRoomRepository) {}

  execute(paramsEditRoom: UpdateRoomRequest): Promise<RoomEntity> {
    return this._roomRepository.updateRoom(paramsEditRoom);
  }
}
