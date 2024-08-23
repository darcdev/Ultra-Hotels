import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface BookingRoomFormModel {
  emergencyContactName: FormControl<string>;
  emergencyContactPhone: FormControl<string>;
  guests: FormArray<FormGroup<GuestBookingFormModel>>;
}

export interface GuestBookingFormModel {
  fullName: FormControl<string>;
  birthDate: FormControl<string | null>;
  gender: FormControl<string>;
  documentType: FormControl<string>;
  documentNumber: FormControl<string>;
  email: FormControl<string>;
  phoneNumber: FormControl<string>;
}
