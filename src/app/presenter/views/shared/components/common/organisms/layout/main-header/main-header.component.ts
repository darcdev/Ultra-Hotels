import { Component, OnDestroy } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { Button } from 'primeng/button';
import { NgIcon } from '@ng-icons/core';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { AuthenticationFormModalComponent } from '@/app/presenter/views/shared/components/common/organisms/auth/authentication-form-modal/authentication-form-modal.component';

@Component({
  selector: 'app-main-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    DynamicDialogModule,
    Button,
    NgIcon,
    IconComponent,
    ButtonComponent,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  providers: [DialogService],
})
export class MainHeaderComponent implements OnDestroy {
  constructor(public dialogService: DialogService) {}

  refAuthenticationModal: DynamicDialogRef | undefined;

  openAuthenticationModal() {
    this.refAuthenticationModal = this.dialogService.open(
      AuthenticationFormModalComponent,
      {
        width: 'auto',
        modal: true,
        closable: true,
      }
    );
  }

  ngOnDestroy() {
    if (this.refAuthenticationModal) {
      this.refAuthenticationModal.close();
      this.refAuthenticationModal = undefined; // Reset ref on destroy
    }
  }
}
