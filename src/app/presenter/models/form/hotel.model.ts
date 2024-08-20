import { FormControl, FormGroup } from '@angular/forms';

export interface CreateHotelForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  address: FormGroup<AddressHotelForm>;
}

export interface EditHotelForm {
  name: FormControl<string | null>;
  description: FormControl<string | null>;
  address: FormGroup<AddressHotelForm>;
  isActive: FormControl<boolean | null>;
}

export interface AddressHotelForm {
  country: FormControl<string | null>;
  city: FormControl<string | null>;
  additionalInfo: FormControl<string | null>;
}
