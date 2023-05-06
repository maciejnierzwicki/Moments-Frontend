import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../token-storage/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private tokenStorage: TokenStorageService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	var isLoggedIn = !!this.tokenStorage.getToken();
	
	if(!isLoggedIn) {
		this.router.navigate(['/signin'], {
			queryParams: {
				return: state.url
			}
		});
		return false;
	}
	return true;
  }
}
