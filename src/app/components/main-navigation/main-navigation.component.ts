import { Component, OnInit, DoCheck } from '@angular/core';
import { AppComponent } from '../../app.component';
import { NotificationsBarComponent } from '../notifications-bar/notifications-bar.component';
import { Profile } from '../../objects/Profile';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

	private currentChild: string = "";

  constructor(private app: AppComponent, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
  }
  
  ngDoCheck(): void {
	this.route.firstChild?.url.subscribe((url: UrlSegment[]) => {
		this.currentChild = url[0] != null ? url[0].path : '';
	});
  }

  
  getChildPath(): string {
	  return this.currentChild;
  }
  
  isLoggedUser(): boolean {
  	return this.authService.isLoggedUser();
  }

  isLoggedVerifiedUser(): boolean | undefined {
    return this.authService.getLoggedUser()?.verified;
  }

  	signOut(): void {
		this.authService.signOut();
	}
	
	getLoggedUser(): Profile | null {
		return this.authService.getLoggedUser();
	}

}
