import { RoomEntity } from '@/app/domain/entities/room.entity';

export class AddRoom {
  static readonly type = '[Room] Add Room';
  constructor(public payload: RoomEntity) {}
}

export class AddRooms {
  static readonly type = '[Room] Add Rooms';
  constructor(public payload: RoomEntity[]) {}
}

export class RemoveRoom {
  static readonly type = '[Room] Remove Room';
  constructor(public roomId: string) {}
}

export class EditRoom {
  static readonly type = '[Room] Edit Room';
  constructor(public payload: RoomEntity) {}
}

export class SetRooms {
  static readonly type = '[Room] Set Room';
  constructor(public payload: RoomEntity[]) {}
}
