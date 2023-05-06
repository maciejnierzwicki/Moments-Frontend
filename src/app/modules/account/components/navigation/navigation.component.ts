import { Component, DoCheck } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'account-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements DoCheck {
	
  private currentChild: string = "";

  constructor(private route: ActivatedRoute, private authService: AuthService) { }
  
  ngDoCheck(): void {
	this.route.firstChild?.url.subscribe((url: UrlSegment[]) => {
		this.currentChild = url[0] != null ? url[0].path : '';
	});
  }

  
  getChildPath(): string {
	  return this.currentChild;
  }

  isVerifiedUser(): boolean | undefined {
    return this.authService.getLoggedUser()?.verified;
  }

}
