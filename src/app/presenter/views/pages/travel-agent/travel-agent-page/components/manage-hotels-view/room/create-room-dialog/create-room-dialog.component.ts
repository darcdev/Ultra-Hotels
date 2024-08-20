import { Component } from '@angular/core';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { ErrorsFormMessagesComponent } from '@/app/presenter/views/shared/components/common/organisms/errors-form-messages/errors-form-messages.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { CreateRoomForm } from '@/app/presenter/models/form/room.model';
import { CreateRoomUseCaseService } from '@/app/domain/usecases/room/create-room-use-case.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RoomOperationError } from '@/app/core/validations/rooms/room-operation.error';
import { AutoFocus } from 'primeng/autofocus';
import { roomHotelTypes } from '@/app/presenter/views/shared/constants/room';
import { HotelEntity } from '@/app/domain/entities/hotel.entity';

interface CreateRoomModalDynamicDialogConfigData {
  hotel: HotelEntity;
}

@Component({
  selector: 'app-create-room-dialog',
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
    AutoFocus,
  ],
  templateUrl: './create-room-dialog.component.html',
  styleUrl: './create-room-dialog.component.scss',
})
export class CreateRoomDialogComponent {
  createRoomForm!: FormGroup<CreateRoomForm>;
  roomHotelTypesList = roomHotelTypes;

  constructor(
    private fb: FormBuilder,
    private createRoomUseCaseService: CreateRoomUseCaseService,
    private dialogConfigService: DynamicDialogConfig<CreateRoomModalDynamicDialogConfigData>,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef
  ) {
    this.createRoomForm = this.fb.group<CreateRoomForm>({
      type: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      basePrice: this.fb.control(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      taxes: this.fb.control(0, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      roomNumber: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      capacity: this.fb.control(1, {
        nonNullable: true,
        validators: [Validators.required, Validators.min(1)],
      }),
      description: this.fb.control(''),
    });
  }

  async createRoom() {
    if (this.createRoomForm.invalid) {
      this.createRoomForm.markAllAsTouched();
      return;
    }

    try {
      console.log(this.createRoomForm.value);
      await this.createRoomUseCaseService.execute({
        type: (
          this.createRoomForm.value.type as unknown as {
            id: string;
            value: string;
          }
        ).value,
        basePrice: this.createRoomForm.value.basePrice!,
        taxes: this.createRoomForm.value.taxes!,
        roomNumber: this.createRoomForm.value.roomNumber!,
        capacity: this.createRoomForm.value.capacity!,
        description: this.createRoomForm.value.description ?? '',
        hotel: this.dialogConfigService.data?.hotel.id,
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Crear nueva habitación',
        detail: 'Se ha creado la habitación exitosamente',
        closable: true,
      });

      this.dialogRef.close();
    } catch (error) {
      if (error instanceof RoomOperationError) {
        console.error(
          'Ha ocurrido un error al crear la habitación',
          error.message
        );
      }
    }
  }
}
