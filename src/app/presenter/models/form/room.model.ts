import { FormControl } from '@angular/forms';

export interface CreateRoomForm {
  type: FormControl<string | null>;
  basePrice: FormControl<number | null>;
  taxes: FormControl<number | null>;
  roomNumber: FormControl<string | null>;
  capacity: FormControl<number | null>;
  description: FormControl<string | null>;
}

export interface EditRoomForm {
  isAvailable: FormControl<boolean | null>;
  type: FormControl<{ id: string; value: string } | null>;
  basePrice: FormControl<number | null>;
  taxes: FormControl<number | null>;
  roomNumber: FormControl<string | null>;
  capacity: FormControl<number | null>;
  description: FormControl<string | null>;
}
