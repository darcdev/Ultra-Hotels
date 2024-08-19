import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Session } from '@supabase/supabase-js';
import { UserLoggedPanelComponent } from '@/app/presenter/views/shared/components/common/molecules/user-logged-panel/user-logged-panel.component';
import { SessionUserService } from '@/app/presenter/views/shared/services/session-user.service';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Subscription } from 'rxjs';

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
    UserLoggedPanelComponent,
    OverlayPanelModule,
  ],
  templateUrl: './main-header.component.html',
  styleUrl: './main-header.component.scss',
  providers: [DialogService],
})
export class MainHeaderComponent implements OnInit, OnDestroy {
  sessionUser: Session | null = null;
  private subscriptionAuthSessionService!: Subscription;

  constructor(
    public dialogService: DialogService,
    public sessionUserServiceService: SessionUserService
  ) {}

  ngOnInit() {
    void this.getSessionUser();
  }

  getSessionUser() {
    this.sessionUserServiceService.session$.subscribe(session => {
      this.sessionUser = session;
    });
  }

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
    if (this.subscriptionAuthSessionService) {
      this.subscriptionAuthSessionService.unsubscribe();
    }
  }
}
