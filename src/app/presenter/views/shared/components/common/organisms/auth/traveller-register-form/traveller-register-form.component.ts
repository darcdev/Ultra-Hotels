import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { GoogleAuthButtonComponent } from '@/app/presenter/views/shared/components/common/atoms/google-auth-button/google-auth-button.component';
import { InputTextModule } from 'primeng/inputtext';

import { RegisterTravellerForm } from '@/app/presenter/models/form/auth-users.model';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TravelAgenterAuthenticationFormComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/travel-agenter-authentication-form/travel-agenter-authentication-form.component';
import { TravellerAuthenticationFormComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/traveller-authentication-form/traveller-authentication-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationFormModalComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/authentication-form-modal/authentication-form-modal.component';
import { AuthenticateUserOAuthService } from '@/app/domain/usecases/user/authenticate-user-oauth.service';
import { OauthProviders } from '@/app/core/constants/OauthProviders';
import { CreateSimpleAccountUserUseCaseService } from '@/app/domain/usecases/user/create-simple-account-user-use-case.service';
import { RegisterUserRequestDTO } from '@/app/core/models/dtos/auth';
import { ErrorsFormMessagesComponent } from '@/app/presenter/views/shared/components/common/organisms/errors-form-messages/errors-form-messages.component';
import { matchPasswords } from '@/app/presenter/views/shared/validators/matchPasswords';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-traveller-register-form',
  standalone: true,
  imports: [
    ButtonComponent,
    FloatLabelModule,
    GoogleAuthButtonComponent,
    InputTextModule,
    ReactiveFormsModule,
    IconComponent,
    ToggleButtonModule,
    TravelAgenterAuthenticationFormComponent,
    TravellerAuthenticationFormComponent,
    FormsModule,
    ErrorsFormMessagesComponent,
  ],
  templateUrl: './traveller-register-form.component.html',
  styleUrl: './traveller-register-form.component.scss',
  providers: [DialogService],
})
export class TravellerRegisterFormComponent {
  travellerRegisterForm: FormGroup<RegisterTravellerForm>;

  refAuthenticationModal: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private refRegisterTraveller: DynamicDialogRef,
    private oauthUserUseCaseService: AuthenticateUserOAuthService,
    private createSimpleAccountUserUseCaseService: CreateSimpleAccountUserUseCaseService,
    private messageToastService: MessageService
  ) {
    this.travellerRegisterForm = new FormGroup<RegisterTravellerForm>(
      {
        full_name: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        email: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        password: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required, Validators.minLength(6)],
        }),
        repeatPassword: new FormControl('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      },
      { validators: [matchPasswords('password', 'repeatPassword')] }
    );
  }

  async registerUserWithGoogle() {
    await this.oauthUserUseCaseService.execute({
      provider: OauthProviders.GOOGLE,
    });
  }

  async registerUserEmailAndPassword() {
    if (this.travellerRegisterForm.invalid) {
      this.travellerRegisterForm.markAllAsTouched();
      return;
    }
    try {
      const userDataRegister = this.travellerRegisterForm.value;

      const userDataRegisterDTO: RegisterUserRequestDTO = {
        email: userDataRegister.email ?? '',
        password: userDataRegister.password ?? '',
        full_name: userDataRegister.full_name ?? '',
      };

      const { data } =
        await this.createSimpleAccountUserUseCaseService.execute(
          userDataRegisterDTO
        );

      if (data.user) {
        this.refRegisterTraveller.close();

        this.messageToastService.add({
          severity: 'success',
          summary: 'Registro de usuario',
          detail: 'Usuario registrado correctamente',
        });
      }
    } catch (error) {
      console.error('Ha ocurrido un error al registrar el usuario', error);
    }
  }

  openLoginModal() {
    this.refRegisterTraveller.close();

    this.refAuthenticationModal = this.dialogService.open(
      AuthenticationFormModalComponent,
      {
        width: 'auto',
        modal: true,
        closable: true,
      }
    );
  }
}
