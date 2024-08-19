import { FormControl } from '@angular/forms';

export interface LoginUserForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface RegisterTravellerForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  repeatPassword: FormControl<string | null>;
}
