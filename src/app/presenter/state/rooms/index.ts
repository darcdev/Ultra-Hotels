import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  AddRoom,
  AddRooms,
  EditRoom,
  RemoveRoom,
  SetRooms,
} from '@/app/presenter/state/rooms/actions';
import { RoomStateModel } from '@/app/presenter/state/rooms/models';

@State<RoomStateModel>({
  name: 'room',
  defaults: {
    rooms: [],
  },
})
@Injectable()
export class RoomState {
  @Selector()
  static getRooms(state: RoomStateModel) {
    return state.rooms || [];
  }
  @Action(AddRoom)
  addRoom(
    { getState, patchState }: StateContext<RoomStateModel>,
    { payload }: AddRoom
  ) {
    const state = getState();
    patchState({
      rooms: [...state.rooms, payload],
    });
  }

  @Action(AddRooms)
  addRooms(
    { getState, patchState }: StateContext<RoomStateModel>,
    { payload }: AddRooms
  ) {
    const state = getState();
    patchState({
      rooms: [...payload, ...state.rooms],
    });
  }

  @Action(SetRooms)
  setRooms(
    { patchState }: StateContext<RoomStateModel>,
    { payload }: AddRooms
  ) {
    patchState({
      rooms: [...payload],
    });
  }

  @Action(RemoveRoom)
  removeRoom(
    { getState, patchState }: StateContext<RoomStateModel>,
    { roomId }: RemoveRoom
  ) {
    const state = getState();
    patchState({
      rooms: state.rooms.filter(room => (room?.id ?? '') !== roomId),
    });
  }

  @Action(EditRoom)
  editRoom(
    { getState, patchState }: StateContext<RoomStateModel>,
    { payload }: EditRoom
  ) {
    const state = getState();

    const updatedRooms = state.rooms.map(room =>
      room.id === payload.id ? { ...room, ...payload } : room
    );

    patchState({
      rooms: updatedRooms,
    });
  }
}
