import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { ErrorsFormMessagesComponent } from '@/app/presenter/views/shared/components/common/organisms/errors-form-messages/errors-form-messages.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import {
  BookingRoomFormModel,
  GuestBookingFormModel,
} from '@/app/presenter/models/form/booking.model';
import { ButtonDirective } from 'primeng/button';
import { NgForOf } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HotelFilterModel } from '@/app/presenter/models/form/hotel-filter.model';
import { SearchHotelsFilterState } from '@/app/presenter/state/searchHotelsFilter';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { CreateCompleteBookingUseCaseService } from '@/app/domain/usecases/booking/create-complete-booking-use-case.service';
import { MessageService } from 'primeng/api';
import { BookingOperationError } from '@/app/core/validations/bookings/booking-operation-error';
import { GuestOperationError } from '@/app/core/validations/guests/guest-operation-error';
import { StatusProcessAction } from '@/app/presenter/models/state/statusProcessAction';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

export interface AddGuestToBookingDynamicDialogConfig {
  room: RoomEntity;
}

@Component({
  selector: 'app-add-guests-to-room-reservation',
  standalone: true,
  imports: [
    ButtonComponent,
    IconComponent,
    ErrorsFormMessagesComponent,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonDirective,
    NgForOf,
    CalendarModule,
    MessageModule,
    ProgressSpinnerModule,
  ],
  templateUrl: './add-guests-to-room-reservation.component.html',
  styleUrl: './add-guests-to-room-reservation.component.scss',
  providers: [MessageService],
})
export class AddGuestsToRoomReservationComponent implements OnInit {
  reservationForm!: FormGroup<BookingRoomFormModel>;

  actualSearchHotel: HotelFilterModel | null = null;
  actualSearchHotel$: Observable<HotelFilterModel | null>;

  actualRoom: RoomEntity | null = null;
  stateReservationProcess = StatusProcessAction.IDLE;

  constructor(
    private createCompleteBookingUseCaseService: CreateCompleteBookingUseCaseService,
    private store: Store,
    private dialogConfig: DynamicDialogConfig<AddGuestToBookingDynamicDialogConfig>,
    private dynamicDialogRef: DynamicDialogRef
  ) {
    this.actualSearchHotel$ = this.store.select(
      SearchHotelsFilterState.getActualSearchHotelFilter
    );
    this.actualRoom = this.dialogConfig.data?.room ?? null;
  }

  ngOnInit(): void {
    this.actualSearchHotel$.subscribe(actualSearchFilterHotel => {
      this.actualSearchHotel = actualSearchFilterHotel;
    });

    this.reservationForm = new FormGroup<BookingRoomFormModel>({
      emergencyContactName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      emergencyContactPhone: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      guests: new FormArray<FormGroup<GuestBookingFormModel>>([]),
    });
    this.addGuest();
  }

  get guests(): FormArray<FormGroup<GuestBookingFormModel>> {
    return this.reservationForm.controls.guests;
  }

  createGuestFormGroup(): FormGroup<GuestBookingFormModel> {
    return new FormGroup<GuestBookingFormModel>({
      fullName: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      birthDate: new FormControl(null, {
        nonNullable: true,
        validators: [Validators.required],
      }),
      gender: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      documentType: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      documentNumber: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phoneNumber: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  addGuest(): void {
    this.guests.push(this.createGuestFormGroup());
  }

  removeGuest(index: number): void {
    this.guests.removeAt(index);
  }

  async submitReservation(): Promise<void> {
    if (this.reservationForm.invalid) {
      this.reservationForm.markAllAsTouched();
      return;
    }
    console.log('ssss');
    console.log(this.actualSearchHotel);
    this.stateReservationProcess = StatusProcessAction.LOADING;
    try {
      await this.createCompleteBookingUseCaseService.execute({
        emergencyContactFullName:
          this.reservationForm.value.emergencyContactName!,
        emergencyPhone: this.reservationForm.value.emergencyContactPhone!,
        dateArrive: this.actualSearchHotel!.dateArrive!,
        dateCheckout: this.actualSearchHotel!.dateCheckout!,
        totalPrice: this.actualRoom!.basePrice + this.actualRoom!.taxes,
        guests: this.reservationForm.value.guests?.map(guest => ({
          fullName: guest.fullName!,
          birthDate: guest.birthDate!,
          gender: guest.gender!,
          documentType: guest.documentType!,
          documentNumber: guest.documentNumber!,
          email: guest.email!,
          phoneNumber: guest.phoneNumber!,
        })),
        room: this.actualRoom?.id,
      });

      this.stateReservationProcess = StatusProcessAction.SUCCESS;

      this.dynamicDialogRef.close({
        success: true,
      });
    } catch (error) {
      this.stateReservationProcess = StatusProcessAction.ERROR;

      if (error instanceof BookingOperationError) {
        console.error(
          'Ha ocurrido un error al crear la reservación',
          error.message
        );
      } else if (error instanceof GuestOperationError) {
        console.error(
          'Ha ocurrido un error al crear los huespedes',
          error.message
        );
      }
    }
  }

  protected readonly FormGroup = FormGroup;
  protected readonly StatusProcessAction = StatusProcessAction;
}
