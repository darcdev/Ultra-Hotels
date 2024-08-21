import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EditRoomForm } from '@/app/presenter/models/form/room.model';
import { roomHotelTypes } from '@/app/presenter/views/shared/constants/room';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { RoomOperationError } from '@/app/core/validations/rooms/room-operation.error';
import { EditRoomUseCaseService } from '@/app/domain/usecases/room/edit-room-use-case.service';
import { AutoFocus } from 'primeng/autofocus';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { DropdownModule } from 'primeng/dropdown';
import { ErrorsFormMessagesComponent } from '@/app/presenter/views/shared/components/common/organisms/errors-form-messages/errors-form-messages.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { StatusProcessAction } from '@/app/presenter/models/state/statusProcessAction';
import { RoomEntity } from '@/app/domain/entities/room.entity';
import { GetRoomByIdUseCaseService } from '@/app/domain/usecases/room/get-room-by-id-use-case.service';
import { InputSwitchModule } from 'primeng/inputswitch';

interface EditRoomModalDynamicDialogConfigData {
  room: RoomEntity;
}
@Component({
  selector: 'app-edit-room-dialog',
  standalone: true,
  imports: [
    AutoFocus,
    ButtonComponent,
    DropdownModule,
    ErrorsFormMessagesComponent,
    FloatLabelModule,
    FormsModule,
    InputTextModule,
    InputTextareaModule,
    PaginatorModule,
    ReactiveFormsModule,
    InputSwitchModule,
  ],
  templateUrl: './edit-room-dialog.component.html',
  styleUrl: './edit-room-dialog.component.scss',
})
export class EditRoomDialogComponent implements OnInit {
  editRoomForm!: FormGroup<EditRoomForm>;
  roomHotelTypesList = roomHotelTypes;
  actualRoom!: RoomEntity;
  loadingDataRoomToEdit: StatusProcessAction = StatusProcessAction.IDLE;

  constructor(
    private fb: FormBuilder,
    private editRoomUseCaseService: EditRoomUseCaseService,
    private getRoomUseCaseService: GetRoomByIdUseCaseService,
    private dialogConfigService: DynamicDialogConfig<EditRoomModalDynamicDialogConfigData>,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef
  ) {
    this.editRoomForm = this.fb.group<EditRoomForm>({
      type: this.fb.control(null, {
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
      isAvailable: this.fb.control(false, {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  ngOnInit() {
    void this.getRoomToEdit();
  }

  async getRoomToEdit() {
    this.loadingDataRoomToEdit = StatusProcessAction.LOADING;

    try {
      this.actualRoom = await this.getRoomUseCaseService.execute(
        this.dialogConfigService.data?.room.id ?? ''
      );
      this.loadingDataRoomToEdit = StatusProcessAction.SUCCESS;

      this.editRoomForm.patchValue({
        type: roomHotelTypes.find(type => type.value === this.actualRoom.type),
        basePrice: this.actualRoom.basePrice,
        taxes: this.actualRoom.taxes,
        roomNumber: this.actualRoom.roomNumber,
        capacity: this.actualRoom.capacity,
        description: this.actualRoom.description ?? '',
        isAvailable: this.actualRoom.isAvailable,
      });
    } catch (error) {
      console.error(error);
      this.loadingDataRoomToEdit = StatusProcessAction.ERROR;
    }
  }

  async editRoom() {
    if (this.editRoomForm.invalid) {
      this.editRoomForm.markAllAsTouched();
      return;
    }
    try {
      await this.editRoomUseCaseService.execute({
        roomId: this.dialogConfigService.data?.room.id ?? '',
        roomData: {
          id: this.dialogConfigService.data?.room.id ?? '',
          type: (
            this.editRoomForm.value.type as unknown as {
              id: string;
              value: string;
            }
          ).value,
          basePrice: this.editRoomForm.value.basePrice!,
          taxes: this.editRoomForm.value.taxes!,
          roomNumber: this.editRoomForm.value.roomNumber!,
          capacity: this.editRoomForm.value.capacity!,
          description: this.editRoomForm.value.description ?? '',
          isAvailable:
            this.editRoomForm.value.isAvailable ?? this.actualRoom.isAvailable,
        },
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Editar habitación',
        detail: 'Se ha editado la habitación exitosamente',
        closable: true,
      });

      this.dialogRef.close();
    } catch (error) {
      if (error instanceof RoomOperationError) {
        console.error(
          'Ha ocurrido un error al editar la habitación',
          error.message
        );
      }
    }
  }

  protected readonly StatusProcessAction = StatusProcessAction;
}
