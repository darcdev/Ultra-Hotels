import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { ButtonDirective } from 'primeng/button';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  HotelFilterForm,
  HotelFilterModel,
} from '@/app/presenter/models/form/hotel-filter.model';
import { cities } from '@/app/presenter/views/shared/constants/cities';
import { IncrementDecrementValueComponent } from '@/app/presenter/views/shared/components/common/atoms/increment-decrement-value/increment-decrement-value.component';
import { Store } from '@ngxs/store';
import { AddActualSearchHotel } from '@/app/presenter/state/searchHotelsFilter/actions';
import { convertEuropeFormatDateToISO8601 } from '@/app/presenter/views/shared/helpers/convertEuropeFormatDateToISO8601';

@Component({
  selector: 'app-search-filter-hotel-component',
  standalone: true,
  imports: [
    ButtonComponent,
    ButtonDirective,
    IconComponent,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    ReactiveFormsModule,
    IncrementDecrementValueComponent,
  ],
  templateUrl: './search-filter-hotel-component.component.html',
  styleUrl: './search-filter-hotel-component.component.scss',
})
export class SearchFilterHotelComponentComponent implements OnInit {
  searchHotelsForm: FormGroup<HotelFilterForm>;

  minDateCalendar = new Date();

  constructor(private store: Store) {
    this.searchHotelsForm = new FormGroup<HotelFilterForm>({
      city: new FormControl(null, []),
      dateArrive: new FormControl(null, []),
      dateCheckout: new FormControl(null, []),
      numGuests: new FormControl(0, []),
    });
  }

  ngOnInit() {
    this.store.dispatch(
      new AddActualSearchHotel({
        city: null,
        dateArrive: null,
        dateCheckout: null,
        numGuests: 0,
      })
    );
  }

  searchHotelsByFilters() {
    const valuesSearchHotelsForm = this.searchHotelsForm
      .value as HotelFilterModel;

    /** If date of arrival exist and date of checkout doesnt exit, then date of checkout is equal to date of arrival plus 1 day */
    if (
      this.searchHotelsForm.controls.dateArrive.value &&
      !this.searchHotelsForm.controls.dateCheckout.value
    ) {
      let dataCheckout = new Date(
        this.searchHotelsForm.controls.dateArrive.value
      );
      dataCheckout.setDate(dataCheckout.getDate() + 1);
      this.searchHotelsForm.controls.dateCheckout.setValue(dataCheckout);
    }

    /** If date of arrival doesnt exit and date of checkout exist, then date of arrival is equal to date of checkout minus 1 day */
    if (
      this.searchHotelsForm.controls.dateCheckout.value &&
      !this.searchHotelsForm.controls.dateArrive.value
    ) {
      let dataArrive = new Date(
        this.searchHotelsForm.controls.dateCheckout.value
      );
      dataArrive.setDate(dataArrive.getDate() - 1);
      this.searchHotelsForm.controls.dateArrive.setValue(dataArrive);
    }

    this.store.dispatch(
      new AddActualSearchHotel({
        ...valuesSearchHotelsForm,
        city: this.searchHotelsForm.controls.city.value?.name ?? null,
        dateArrive: this.searchHotelsForm.controls.dateArrive.value
          ? convertEuropeFormatDateToISO8601(
              this.searchHotelsForm.controls.dateArrive.value
            )
          : null,
        dateCheckout: this.searchHotelsForm.controls.dateCheckout.value
          ? convertEuropeFormatDateToISO8601(
              this.searchHotelsForm.controls.dateCheckout.value
            )
          : null,
      })
    );
  }

  protected readonly cities = cities;
}
