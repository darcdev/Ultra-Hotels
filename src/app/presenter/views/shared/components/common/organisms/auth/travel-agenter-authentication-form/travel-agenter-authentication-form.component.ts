import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { LoginUserForm } from '@/app/presenter/models/auth-users.model';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-travel-agenter-authentication-form',
  standalone: true,
  imports: [
    FloatLabelModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonComponent,
    Button,
  ],
  templateUrl: './travel-agenter-authentication-form.component.html',
  styleUrl: './travel-agenter-authentication-form.component.scss',
})
export class TravelAgenterAuthenticationFormComponent {
  travelAgentAuthForm: FormGroup<LoginUserForm>;

  constructor(private fb: FormBuilder) {
    this.travelAgentAuthForm = new FormGroup<LoginUserForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }
}
