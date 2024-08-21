import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SearchFilterHotelStateModel } from '@/app/presenter/state/searchHotelsFilter/models';
import {
  AddActualSearchHotel,
  RemoveActualSearchHotel,
} from '@/app/presenter/state/searchHotelsFilter/actions';

@State<SearchFilterHotelStateModel>({
  name: 'searchFilterHotel',
  defaults: {
    actualSearchHotel: null,
  },
})
@Injectable()
export class SearchHotelsFilterState {
  @Selector()
  static getActualSearchHotelFilter(state: SearchFilterHotelStateModel) {
    return state.actualSearchHotel;
  }

  @Action(AddActualSearchHotel)
  addActualSearchHotelFilter(
    { patchState }: StateContext<SearchFilterHotelStateModel>,
    { payload }: AddActualSearchHotel
  ) {
    patchState({
      actualSearchHotel: payload,
    });
  }

  @Action(RemoveActualSearchHotel)
  removeActualModel({ patchState }: StateContext<SearchFilterHotelStateModel>) {
    patchState({
      actualSearchHotel: null,
    });
  }
}
