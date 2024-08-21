import { FormControl } from '@angular/forms';
import { City } from '@/app/presenter/models/form/location.model';

export interface HotelFilterForm {
  city: FormControl<City | null>;
  dateArrive: FormControl<Date | null>;
  dateCheckout: FormControl<Date | null>;
  numGuests: FormControl<number | null>;
}

export interface HotelFilterModel {
  city: string | null;
  dateArrive: string | null;
  dateCheckout: string | null;
  numGuests: number | null;
}
