import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  AddressCreateHotelForm,
  CreateHotelForm,
} from '@/app/presenter/models/form/hotel.model';
import { ErrorsFormMessagesComponent } from '@/app/presenter/views/shared/components/common/organisms/errors-form-messages/errors-form-messages.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { InputTextModule } from 'primeng/inputtext';
import { CreateHotelUseCaseService } from '@/app/domain/usecases/hotel/create-hotel-use-case.service';
import { HotelOperationError } from '@/app/core/validations/hotels/hotel-operation.error';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { SessionUserService } from '@/app/presenter/views/shared/services/session-user.service';
import { Button } from 'primeng/button';
import { MapModalComponent } from '@/app/presenter/views/pages/travel-agent/travel-agent-home-page/components/manage-hotels-view/hotel/map-modal/map-modal.component';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { cities } from '@/app/presenter/views/shared/constants/cities';
import { DropdownModule } from 'primeng/dropdown';
import { countries } from '@/app/presenter/views/shared/constants/countries';
import { Store } from '@ngxs/store';
import { AddHotel } from '@/app/presenter/state/hotels/actions';

@Component({
  selector: 'app-create-new-hotel-modal',
  standalone: true,
  imports: [
    FloatLabelModule,
    ReactiveFormsModule,
    ErrorsFormMessagesComponent,
    InputTextareaModule,
    ButtonComponent,
    InputTextModule,
    FormsModule,
    Button,
    IconComponent,
    DropdownModule,
  ],
  templateUrl: './create-new-hotel-modal.component.html',
  styleUrl: './create-new-hotel-modal.component.scss',
})
export class CreateNewHotelModalComponent {
  createHotelForm!: FormGroup<CreateHotelForm>;

  mapModalRef: DynamicDialogRef | undefined;

  constructor(
    public dialogService: DialogService,
    private fb: FormBuilder,
    private createHotelUseCaseService: CreateHotelUseCaseService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    public sessionUserService: SessionUserService,
    private store: Store
  ) {
    this.createHotelForm = this.fb.group<CreateHotelForm>({
      name: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: this.fb.control(''),
      address: this.fb.group<AddressCreateHotelForm>({
        country: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        city: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        additionalInfo: this.fb.control(''),
        latitude: this.fb.control(51.505, {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.pattern(/^-?\d+(\.\d+)?$/),
          ],
        }),
        longitude: this.fb.control(0.09, {
          nonNullable: true,
          validators: [
            Validators.required,
            Validators.pattern(/^-?\d+(\.\d+)?$/),
          ],
        }),
      }),
    });
  }

  async createHotel() {
    if (this.createHotelForm.invalid) {
      this.createHotelForm.markAllAsTouched();
      return;
    }

    try {
      const hotelCreated = await this.createHotelUseCaseService.execute({
        name: this.createHotelForm.value.name!,
        description: this.createHotelForm.value.description!,
        country: this.createHotelForm.value?.address?.country ?? '',
        city: this.createHotelForm.value?.address?.city ?? '',
        additionalAdressInfo:
          this.createHotelForm.value?.address?.additionalInfo ?? '',
        agency: this.sessionUserService.getUserSession()?.user?.id,
        latitude: this.createHotelForm.value.address?.latitude ?? 0,
        longitude: this.createHotelForm.value.address?.latitude ?? 0,
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Crear nuevo hotel',
        detail: 'Se ha creado el hotel exitosamente',
        closable: true,
      });

      this.store.dispatch(new AddHotel(hotelCreated));

      this.dialogRef.close();
    } catch (error) {
      if (error instanceof HotelOperationError) {
        console.error('Ha ocurrido un error al crear el hotel', error.message);
      }
    }
  }

  openMapModal() {
    this.mapModalRef = this.dialogService.open(MapModalComponent, {
      header: 'Ubicación del hotel',
      width: '50rem',
    });

    this.mapModalRef.onClose.subscribe(
      (data: { latitude: number; longitude: number }) => {
        if (data) {
          this.createHotelForm.patchValue({
            address: {
              latitude: data?.latitude ?? 0,
              longitude: data?.longitude ?? 0,
            },
          });
        }
      }
    );
  }

  protected readonly cities = cities;
  protected readonly countries = countries;
}
