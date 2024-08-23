import { Component, OnInit } from '@angular/core';
import { HotelItemComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/list-hotels/hotel-item/hotel-item.component';
import { SidebarRoomsHotelComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/room/sidebar-rooms-hotel/sidebar-rooms-hotel.component';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { ListFilterItemComponent } from '@/app/presenter/views/pages/traveller/traveller-home-page/components/filter-hotels/list-filter-item/list-filter-item.component';
import { Observable } from 'rxjs';
import { HotelFilterModel } from '@/app/presenter/models/form/hotel-filter.model';
import { Store } from '@ngxs/store';
import { SearchHotelsFilterState } from '@/app/presenter/state/searchHotelsFilter';
import { GetAllHotelsByFilterUseCaseService } from '@/app/domain/usecases/hotel/get-all-hotels-by-filter-use-case.service';
import { HotelOperationError } from '@/app/core/validations/hotels/hotel-operation.error';
import { SetHotel } from '@/app/presenter/state/hotels/actions';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { StatusProcessAction } from '@/app/presenter/models/state/statusProcessAction';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-list-filter-hotels',
  standalone: true,
  imports: [
    HotelItemComponent,
    SidebarRoomsHotelComponent,
    ListFilterItemComponent,
    ProgressSpinnerModule,
    ToastModule,
  ],
  templateUrl: './list-filter-hotels.component.html',
  styleUrl: './list-filter-hotels.component.scss',
})
export class ListFilterHotelsComponent implements OnInit {
  listOfHotelsFilter: HotelEntity[] = [];

  stateLoading: StatusProcessAction = StatusProcessAction.IDLE;

  actualSearchFilterHotel: HotelFilterModel | null = null;
  actualSearchFilterHotel$: Observable<HotelFilterModel | null>;

  constructor(
    private store: Store,
    private getAllHotelsByFilterUseCase: GetAllHotelsByFilterUseCaseService
  ) {
    this.actualSearchFilterHotel$ = this.store.select(
      SearchHotelsFilterState.getActualSearchHotelFilter
    );
  }

  ngOnInit() {
    this.actualSearchFilterHotel$.subscribe(filterSearch => {
      this.actualSearchFilterHotel = filterSearch;
      void this.searchHotelsByFilters();
    });
  }

  async searchHotelsByFilters() {
    this.stateLoading = StatusProcessAction.LOADING;
    try {
      this.listOfHotelsFilter = await this.getAllHotelsByFilterUseCase.execute(
        this.actualSearchFilterHotel!
      );
      this.store.dispatch(new SetHotel(this.listOfHotelsFilter));
      this.stateLoading = StatusProcessAction.SUCCESS;
    } catch (error) {
      this.stateLoading = StatusProcessAction.ERROR;
      if (error instanceof HotelOperationError) {
        console.error('Error al buscar hoteles por filtro');
      }
    }
  }

  protected readonly StatusProcessAction = StatusProcessAction;
}
