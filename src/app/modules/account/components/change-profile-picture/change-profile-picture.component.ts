import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfilePictureForm } from './profilepicture.form';
import { AccountService } from '../../account.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Profile } from '../../../../objects/Profile';

@Component({
  selector: 'app-change-profile-picture',
  templateUrl: './change-profile-picture.component.html',
  styleUrls: ['./change-profile-picture.component.css']
})
export class ChangeProfilePictureComponent implements OnInit {

	form: ProfilePictureForm;
	error = undefined;
	sendSuccess = false;
	currentUser: Profile | null;

	constructor(private accountService: AccountService, private authService: AuthService) { 
		this.form = new ProfilePictureForm();
		this.currentUser = this.authService.getLoggedUser();
	}

	  ngOnInit(): void {
	  }
  
  
	sendProfilePictureForm(): void {
		this.accountService.changeProfilePicture(this.form)
			.subscribe(response => {
				let user: Profile = response.body;
				this.error = undefined;
				this.sendSuccess = true;
				this.authService.updateUser(user);
				setTimeout(() => {
					window.location.reload();
				}, 1500);
			}, (errorResponse: HttpErrorResponse) => {
				this.error = errorResponse.error.error;
			});
	}
	
	
	setImage(event: Event): void {
		let target: EventTarget = <EventTarget>event.target;
		if(target) {
			let files: FileList = <FileList>(target as HTMLInputElement).files;
			this.form.image = files[0];
		}
	}

}
