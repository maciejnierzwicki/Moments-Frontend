import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardLoggedNotVerifiedService {

  constructor(private router: Router,  private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var verified = !!this.authService.getLoggedUser()?.verified;

    if (!verified) {
      this.router.navigate(['/account/verification']);
      return false;
    }
    return true;
  }
}
