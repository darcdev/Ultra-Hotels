import { Component, Input, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LoginUserForm } from '@/app/presenter/models/form/auth-users.model';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { Button } from 'primeng/button';
import { ErrorsFormMessagesComponent } from '@/app/presenter/views/shared/components/common/organisms/errors-form-messages/errors-form-messages.component';
import { LoginUserRequestDTO } from '@/app/core/models/dtos/auth';
import { SimpleUserLoginUseCaseService } from '@/app/domain/usecases/user/simple-user-login-use-case-service';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { IAuthUserSession } from '@/app/core/interfaces/Iauth-user-session';
import { UserProfileResponse } from '@/app/core/models/auth';

@Component({
  selector: 'app-travel-agenter-authentication-form',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonComponent,
    Button,
    ErrorsFormMessagesComponent,
    MessageModule,
  ],
  templateUrl: './travel-agenter-authentication-form.component.html',
  styleUrl: './travel-agenter-authentication-form.component.scss',
})
export class TravelAgenterAuthenticationFormComponent implements OnInit {
  @Input({ required: true }) closeAuthenticationDialog!: () => void;

  travelAgentAuthForm: FormGroup<LoginUserForm>;
  actualUser: UserProfileResponse | null = null;

  messageErrorAuthTravelAgent: string | null = null;

  constructor(
    private loginSimpleAccountUserUseCaseService: SimpleUserLoginUseCaseService,
    private router: Router,
    public authSupabaseService: IAuthUserSession
  ) {
    this.travelAgentAuthForm = new FormGroup<LoginUserForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    void this.getProfile();
  }

  async getProfile() {
    try {
      this.actualUser = await this.authSupabaseService.getUser();
    } catch {
      this.actualUser = null;
    }
  }

  async loginUserWithEmailAndPassword() {
    if (this.travelAgentAuthForm.invalid) {
      this.travelAgentAuthForm.markAllAsTouched();
      return;
    }
    try {
      const userDataLogin = this.travelAgentAuthForm.value;

      const userTravelAgentDataLoginDTO: LoginUserRequestDTO = {
        email: userDataLogin.email!,
        password: userDataLogin.password!,
      };

      const { data, error } =
        await this.loginSimpleAccountUserUseCaseService.execute(
          userTravelAgentDataLoginDTO
        );

      if (error) {
        this.messageErrorAuthTravelAgent =
          'Credenciales incorrectas, intenta de nuevo';
      }

      if (data.user) {
        this.closeAuthenticationDialog();
        await this.router.navigate(['/travel-agent']);
      }
    } catch {
      this.messageErrorAuthTravelAgent =
        'Ha ocurrido un error al iniciar sesión, intenta de nuevo';
    }
  }
}
