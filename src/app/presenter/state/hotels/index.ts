import { Action, Selector, State, StateContext } from '@ngxs/store';
import { HotelStateModel } from '@/app/presenter/state/hotels/models';
import {
  AddActualHotel,
  RemoveActualHotel,
} from '@/app/presenter/state/hotels/actions';
import { Injectable } from '@angular/core';

@State<HotelStateModel>({
  name: 'hotel',
  defaults: {
    actualHotel: null,
  },
})
@Injectable()
export class HotelState {
  @Selector()
  static getActualHotel(state: HotelStateModel) {
    return state.actualHotel;
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

  @Action(RemoveActualHotel)
  removeActualModel({ patchState }: StateContext<HotelStateModel>) {
    patchState({
      actualHotel: null,
    });
  }
}
