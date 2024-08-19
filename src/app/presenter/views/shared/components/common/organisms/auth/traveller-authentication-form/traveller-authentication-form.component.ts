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

@Component({
  selector: 'app-traveller-authentication-form',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ButtonComponent,
    ReactiveFormsModule,
    GoogleAuthButtonComponent,
  ],
  templateUrl: './traveller-authentication-form.component.html',
  styleUrl: './traveller-authentication-form.component.scss',
  providers: [DialogService],
})
export class TravellerAuthenticationFormComponent {
  @Input({ required: true }) closeAuthenticationDialog!: () => void;

  travellerAuthForm: FormGroup<LoginUserForm>;

  refAuthenticationModal: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {
    this.travellerAuthForm = new FormGroup<LoginUserForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
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
