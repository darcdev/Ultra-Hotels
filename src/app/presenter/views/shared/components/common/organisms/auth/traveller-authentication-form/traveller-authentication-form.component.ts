import { Component, Input } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginUserForm } from '@/app/presenter/models/auth-users.model';
import { GoogleAuthButtonComponent } from '@/app/presenter/views/shared/components/common/atoms/google-auth-button/google-auth-button.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TravellerRegisterFormComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/traveller-register-form/traveller-register-form.component';
import { OauthProviders } from '@/app/core/constants/OauthProviders';
import { LoginUserRequestDTO } from '@/app/core/models/dto/auth';
import { SimpleUserLoginUseCaseService } from '@/app/domain/usecases/user/simple-user-login-use-case-service';
import { AuthenticateUserOAuthService } from '@/app/domain/usecases/user/authenticate-user-oauth.service';
import { MessageModule } from 'primeng/message';
import { ErrorsFormMessagesComponent } from '@/app/presenter/views/shared/components/common/organisms/errors-form-messages/errors-form-messages.component';

@Component({
  selector: 'app-traveller-authentication-form',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ButtonComponent,
    ReactiveFormsModule,
    GoogleAuthButtonComponent,
    MessageModule,
    ErrorsFormMessagesComponent,
  ],
  templateUrl: './traveller-authentication-form.component.html',
  styleUrl: './traveller-authentication-form.component.scss',
  providers: [DialogService],
})
export class TravellerAuthenticationFormComponent {
  @Input({ required: true }) closeAuthenticationDialog!: () => void;

  travellerAuthForm: FormGroup<LoginUserForm>;
  refAuthenticationModal: DynamicDialogRef | undefined;
  messageErrorAuthUser: string | null = null;

  constructor(
    public dialogService: DialogService,
    private oAuthUserUseCaseService: AuthenticateUserOAuthService,
    private loginSimpleAccountUserUseCaseService: SimpleUserLoginUseCaseService
  ) {
    this.travellerAuthForm = new FormGroup<LoginUserForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  async loginUserWithGoogle() {
    await this.oAuthUserUseCaseService.execute({
      provider: OauthProviders.GOOGLE,
    });
  }

  async loginUserWithEmailAndPassword() {
    if (this.travellerAuthForm.invalid) {
      this.travellerAuthForm.markAllAsTouched();
      return;
    }
    try {
      const userDataLogin = this.travellerAuthForm.value;

      const userTravellerDataLoginDTO: LoginUserRequestDTO = {
        email: userDataLogin.email ?? '',
        password: userDataLogin.password ?? '',
      };

      const { data, error } =
        await this.loginSimpleAccountUserUseCaseService.execute(
          userTravellerDataLoginDTO
        );

      if (error) {
        this.messageErrorAuthUser =
          'Credenciales incorrectas, intenta de nuevo';
      }

      if (data.user) {
        this.closeAuthenticationDialog();
      }
    } catch {
      this.messageErrorAuthUser =
        'Ha ocurrido un error al iniciar sesión, intenta de nuevo';
    }
  }

  openRegisterModal() {
    this.closeAuthenticationDialog();

    this.refAuthenticationModal = this.dialogService.open(
      TravellerRegisterFormComponent,
      {
        width: 'auto',
        modal: true,
        closable: true,
      }
    );
  }
}
