import { FormControl } from '@angular/forms';

export interface LoginUserForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface RegisterTravellerForm {
  full_name: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}
