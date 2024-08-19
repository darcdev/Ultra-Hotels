import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { GoogleAuthButtonComponent } from '@/app/presenter/views/shared/components/common/atoms/google-auth-button/google-auth-button.component';
import { InputTextModule } from 'primeng/inputtext';

import { RegisterTravellerForm } from '@/app/presenter/models/auth-users.model';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TravelAgenterAuthenticationFormComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/travel-agenter-authentication-form/travel-agenter-authentication-form.component';
import { TravellerAuthenticationFormComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/traveller-authentication-form/traveller-authentication-form.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthenticationFormModalComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/authentication-form-modal/authentication-form-modal.component';

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
    private refRegisterTraveller: DynamicDialogRef
  ) {
    this.travellerRegisterForm = new FormGroup<RegisterTravellerForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    });
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
