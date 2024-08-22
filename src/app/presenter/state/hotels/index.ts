import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  AddActualHotel,
  AddHotel,
  AddHotels,
  EditHotel,
  RemoveActualHotel,
  RemoveHotel,
  SetHotel,
} from '@/app/presenter/state/hotels/actions';
import { HotelStateModel } from '@/app/presenter/state/hotels/models';

@State<HotelStateModel>({
  name: 'hotel',
  defaults: {
    actualHotel: null,
    hotels: [],
  },
})
@Injectable()
export class HotelState {
  @Selector()
  static getActualHotel(state: HotelStateModel) {
    return state.actualHotel;
  }

  @Selector()
  static getHotels(state: HotelStateModel) {
    return state.hotels;
  }

  @Action(AddActualHotel)
  addActualHotel(
    { patchState }: StateContext<HotelStateModel>,
    { payload }: AddActualHotel
  ) {
    patchState({
      actualHotel: payload,
    });
  }

  @Action(SetHotel)
  setRooms(
    { patchState }: StateContext<HotelStateModel>,
    { payload }: AddHotels
  ) {
    patchState({
      hotels: [...payload],
    });
  }

  @Action(RemoveActualHotel)
  removeActualHotel({ patchState }: StateContext<HotelStateModel>) {
    patchState({
      actualHotel: null,
    });
  }

  @Action(AddHotel)
  addHotel(
    { getState, patchState }: StateContext<HotelStateModel>,
    { payload }: AddHotel
  ) {
    const state = getState();
    patchState({
      hotels: [payload, ...state.hotels],
    });
  }

  @Action(AddHotels)
  addHotels(
    { getState, patchState }: StateContext<HotelStateModel>,
    { payload }: AddHotels
  ) {
    const state = getState();
    patchState({
      hotels: [...payload, ...state.hotels],
    });
  }

  @Action(RemoveHotel)
  removeHotel(
    { getState, patchState }: StateContext<HotelStateModel>,
    { hotelId }: RemoveHotel
  ) {
    const state = getState();
    patchState({
      hotels: state.hotels.filter(hotel => (hotel?.id ?? '') !== hotelId),
    });
  }

  @Action(EditHotel)
  editHotel(
    { getState, patchState }: StateContext<HotelStateModel>,
    { payload }: EditHotel
  ) {
    const state = getState();

    const updatedHotels = state.hotels.map(hotel =>
      hotel.id === payload.id ? { ...hotel, ...payload } : hotel
    );

    patchState({
      hotels: updatedHotels,
    });
  }
}
