import { Injectable } from '@angular/core';
import { UseCase } from '@/app/domain/base/usecase';
import { IRoomRepository } from '@/app/domain/interfaces/iroom.repository';

@Injectable({
  providedIn: 'root',
})
export class DeleteRoomUseCaseService implements UseCase<string, void> {
  constructor(private _roomRepository: IRoomRepository) {}

  execute(roomId: string): Promise<void> {
    return this._roomRepository.deleteRoom(roomId);
  }
}
