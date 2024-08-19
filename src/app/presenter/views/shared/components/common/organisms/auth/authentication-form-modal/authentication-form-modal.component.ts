import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { TravelAgenterAuthenticationFormComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/travel-agenter-authentication-form/travel-agenter-authentication-form.component';
import { TravellerAuthenticationFormComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/traveller-authentication-form/traveller-authentication-form.component';

@Component({
  selector: 'app-authentication-form-modal',
  standalone: true,
  imports: [
    DialogModule,
    ToggleButtonModule,
    IconComponent,
    FormsModule,
    NgIf,
    TravelAgenterAuthenticationFormComponent,
    TravellerAuthenticationFormComponent,
  ],
  templateUrl: './authentication-form-modal.component.html',
  styleUrl: './authentication-form-modal.component.scss',
  providers: [DialogService],
})
export class AuthenticationFormModalComponent {
  isTravelAgent = false;
  isTraveller = true;

  constructor(private refAuthenticationModal: DynamicDialogRef) {}

  closeDialog() {
    this.refAuthenticationModal.close();
  }

  changedIsTravelAgent() {
    this.isTraveller = !this.isTraveller;
  }

  changedIsTraveller() {
    this.isTravelAgent = !this.isTravelAgent;
  }
}
