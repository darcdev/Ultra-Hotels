import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthUserSession } from '@/app/core/interfaces/auth/Iauth-user-session';
import { ActorRoles } from '@/app/core/constants/ActorRoles';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardTravelAgent implements CanActivate {
  constructor(
    private router: Router,
    private authSessionService: IAuthUserSession
  ) {}

  canActivate():
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkUserRole();
  }

  private async checkUserRole(): Promise<boolean | UrlTree> {
    const requiredRole = ActorRoles.TRAVEL_AGENT;
    try {
      const user = await this.authSessionService.getUser();
      if (!user || user.profile.role !== requiredRole) {
        await this.router.navigate(['']);
        return false;
      }
    } catch {
      await this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
