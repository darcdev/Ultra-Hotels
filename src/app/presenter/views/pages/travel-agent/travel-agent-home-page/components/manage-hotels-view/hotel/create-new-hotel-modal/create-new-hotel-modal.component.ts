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
  AddressHotelForm,
  CreateHotelForm,
} from '@/app/presenter/models/form/hotel.model';
import { ErrorsFormMessagesComponent } from '@/app/presenter/views/shared/components/common/organisms/errors-form-messages/errors-form-messages.component';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { InputTextModule } from 'primeng/inputtext';
import { CreateHotelUseCaseService } from '@/app/domain/usecases/hotel/create-hotel-use-case.service';
import { HotelOperationError } from '@/app/core/validations/hotels/hotel-operation.error';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SessionUserService } from '@/app/presenter/views/shared/services/session-user.service';

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
  ],
  templateUrl: './create-new-hotel-modal.component.html',
  styleUrl: './create-new-hotel-modal.component.scss',
})
export class CreateNewHotelModalComponent {
  createHotelForm!: FormGroup<CreateHotelForm>;

  constructor(
    private fb: FormBuilder,
    private createHotelUseCaseService: CreateHotelUseCaseService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    public sessionUserService: SessionUserService
  ) {
    this.createHotelForm = this.fb.group<CreateHotelForm>({
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
    });
  }

  async createHotel() {
    if (this.createHotelForm.invalid) {
      this.createHotelForm.markAllAsTouched();
      return;
    }

    try {
      await this.createHotelUseCaseService.execute({
        name: this.createHotelForm.value.name!,
        description: this.createHotelForm.value.description!,
        country: this.createHotelForm.value?.address?.country ?? '',
        city: this.createHotelForm.value?.address?.city ?? '',
        additionalAdressInfo:
          this.createHotelForm.value?.address?.additionalInfo ?? '',
        agency: this.sessionUserService.getUserSession()?.user?.id,
      });
      this.messageService.add({
        severity: 'success',
        summary: 'Crear nuevo hotel',
        detail: 'Se ha creado el hotel exitosamente',
        closable: true,
      });

      this.dialogRef.close();
    } catch (error) {
      if (error instanceof HotelOperationError) {
        console.error('Ha ocurrido un error al crear el hotel', error.message);
      }
    }
  }
}
