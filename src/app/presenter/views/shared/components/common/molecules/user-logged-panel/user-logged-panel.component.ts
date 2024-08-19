import { Component, OnInit } from '@angular/core';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Session } from '@supabase/supabase-js';
import { SessionUserService } from '@/app/presenter/views/shared/services/session-user.service';
import { AvatarModule } from 'primeng/avatar';
import { Button } from 'primeng/button';
import { ButtonComponent } from '@/app/presenter/views/shared/components/design-system/atoms/button/button.component';
import { IconComponent } from '@/app/presenter/views/shared/components/design-system/atoms/icon/icon.component';
import { LogOutUserCaseService } from '@/app/domain/usecases/user/log-out-user-case.service';

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

  constructor(
    public sessionUserServiceService: SessionUserService,
    private logOutUserCaseService: LogOutUserCaseService
  ) {}

  ngOnInit() {
    void this.getSessionUser();
  }

  getSessionUser() {
    this.sessionUser = this.sessionUserServiceService.getUserSession();
  }

  async logOut() {
    await this.logOutUserCaseService.execute();
  }
}
