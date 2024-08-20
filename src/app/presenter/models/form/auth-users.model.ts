import { FormControl } from '@angular/forms';

export interface LoginUserForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface RegisterTravellerForm {
  email: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}
