import { Component, OnInit } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Session } from '@supabase/supabase-js';
import { SessionUserService } from '@/app/presenter/views/shared/services/session-user.service';
import { AvatarModule } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { LogOutUserCaseService } from '@/app/domain/usecases/user/log-out-user-case.service';
import { IAuthUserSession } from '@/app/core/interfaces/Iauth-user-session';
import { UserProfileResponse } from '@/app/core/models/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-logged-panel',
  standalone: true,
  imports: [
    OverlayPanelModule,
    AvatarModule,
    Button,
    ButtonComponent,
    IconComponent,
  ],
  templateUrl: './user-logged-panel.component.html',
  styleUrl: './user-logged-panel.component.scss',
})
export class UserLoggedPanelComponent implements OnInit {
  sessionUser: Session | null = null;
  userData: UserProfileResponse | null = null;

  constructor(
    public sessionUserServiceService: SessionUserService,
    private logOutUserCaseService: LogOutUserCaseService,
    public authSupabaseService: IAuthUserSession,
    private router: Router
  ) {}

  ngOnInit() {
    void this.getSessionUser();
  }

  async getSessionUser() {
    this.sessionUser = this.sessionUserServiceService.getUserSession();
    if (this.sessionUser?.user) {
      await this.getProfile();
    }
  }

  async getProfile() {
    try {
      this.userData = await this.authSupabaseService.getUser();
    } catch {
      this.userData = null;
    }
  }

  async logOut() {
    await this.logOutUserCaseService.execute();
    await this.router.navigate(['/']);
  }
}
