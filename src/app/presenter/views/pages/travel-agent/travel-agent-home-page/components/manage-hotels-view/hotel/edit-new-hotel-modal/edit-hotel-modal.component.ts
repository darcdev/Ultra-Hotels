import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AddressHotelForm,
  EditHotelForm,
} from '@/app/presenter/models/form/hotel.model';
import { EditHotelUseCaseService } from '@/app/domain/usecases/hotel/edit-hotel-use-case.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HotelOperationError } from '@/app/core/validations/hotels/hotel-operation.error';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { ErrorsFormMessagesComponent } from '@/app/presenter/views/shared/components/common/organisms/errors-form-messages/errors-form-messages.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { GetHotelByIdUseCaseService } from '@/app/domain/usecases/hotel/get-hotel-by-id-use-case.service';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';
import { StatusProcessAction } from '@/app/presenter/models/state/statusProcessAction';
import { InputSwitchModule } from 'primeng/inputswitch';

interface EditHotelModalDynamicDialogConfigData {
  id: string;
}

@Component({
  selector: 'app-edit-hotel-modal',
  standalone: true,
  imports: [
    ButtonComponent,
    ErrorsFormMessagesComponent,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputSwitchModule,
  ],
  templateUrl: './edit-hotel-modal.component.html',
  styleUrl: './edit-hotel-modal.component.scss',
})
export class EditHotelModalComponent implements OnInit {
  editHotelForm!: FormGroup<EditHotelForm>;
  actualHotel!: HotelEntity;

  loadingDataToEdit: StatusProcessAction = StatusProcessAction.IDLE;

  constructor(
    private fb: FormBuilder,
    private editHotelUseCaseService: EditHotelUseCaseService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    private getHotelUseCaseService: GetHotelByIdUseCaseService,
    private dynamicDialogConfig: DynamicDialogConfig<EditHotelModalDynamicDialogConfigData>
  ) {
    this.editHotelForm = this.fb.group<EditHotelForm>({
      name: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      description: this.fb.control(''),
      address: this.fb.group<AddressHotelForm>({
        country: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        city: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        additionalInfo: this.fb.control(''),
      }),
      isActive: this.fb.control(false),
    });
  }

  ngOnInit() {
    void this.getHotelToEdit();
  }

  async getHotelToEdit() {
    this.loadingDataToEdit = StatusProcessAction.LOADING;

    try {
      this.actualHotel = await this.getHotelUseCaseService.execute(
        this.dynamicDialogConfig.data?.id ?? ''
      );
      this.loadingDataToEdit = StatusProcessAction.SUCCESS;

      this.editHotelForm.patchValue({
        name: this.actualHotel.name,
        description: this.actualHotel.description,
        address: {
          country: this.actualHotel.country,
          city: this.actualHotel.city,
          additionalInfo: this.actualHotel.additionalAdressInfo,
        },
        isActive: this.actualHotel.isActive,
      });
    } catch {
      this.loadingDataToEdit = StatusProcessAction.ERROR;
    }
  }

  async editHotel() {
    if (this.editHotelForm.invalid) {
      this.editHotelForm.markAllAsTouched();
      return;
    }

    try {
      await this.editHotelUseCaseService.execute({
        hotelId: this.dynamicDialogConfig.data?.id ?? '',
        hotelData: {
          id: this.dynamicDialogConfig.data?.id ?? '',
          name: this.editHotelForm.value.name!,
          description: this.editHotelForm.value.description!,
          country: this.editHotelForm.value?.address?.country ?? '',
          city: this.editHotelForm.value?.address?.city ?? '',
          additionalAdressInfo:
            this.editHotelForm.value?.address?.additionalInfo ?? '',
          isActive:
            this.editHotelForm.value.isActive ?? this.actualHotel.isActive,
        },
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Editar hotel',
        detail: 'Se ha editado el hotel exitosamente',
        closable: true,
      });

      this.dialogRef.close();
    } catch (error) {
      if (error instanceof HotelOperationError) {
        console.error('Ha ocurrido un error al editar el hotel', error.message);
      }
    }
  }

  protected readonly StatusProcessAction = StatusProcessAction;
}
