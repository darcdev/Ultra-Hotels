import { FormControl, FormGroup } from '@angular/forms';

export interface CreateHotelForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  address: FormGroup<AddressCreateHotelForm>;
}

export interface EditHotelForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  address: FormGroup<AddressHotelForm>;
  isActive: FormControl<boolean | null>;
}

export interface AddressHotelForm {
  country: FormControl<string>;
  city: FormControl<string>;
  additionalInfo: FormControl<string | null>;
  latitude?: FormControl<number | null>;
  longitude?: FormControl<number | null>;
}

export interface AddressCreateHotelForm {
  country: FormControl<string>;
  city: FormControl<string>;
  additionalInfo: FormControl<string | null>;
  latitude: FormControl<number | null>;
  longitude: FormControl<number | null>;
}
