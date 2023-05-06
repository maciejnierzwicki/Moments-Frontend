import { Component, OnInit } from '@angular/core';
import { ChangeEmailForm } from './changeemail.form';
import { AccountService } from '../../account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../../../../objects/Profile';
import { AppError } from '../../../../error';
import { FormsModule } from '@angular/forms';
import { TokenStorageService } from '../../../../services/auth/token-storage/token-storage.service';

@Component({
  selector: 'app-changeemail',
  templateUrl: './changeemail.component.html',
  styleUrls: ['./changeemail.component.css']
})
export class ChangeEmailComponent implements OnInit {

	form: ChangeEmailForm;
	private accountService: AccountService;
	error?: AppError;
	success: boolean = false;
	private tokenService: TokenStorageService;

  constructor(accountService: AccountService, tokenService: TokenStorageService) { 
  	this.accountService = accountService;
	this.tokenService = tokenService;
	this.form = new ChangeEmailForm();
	this.form.apply(<Profile>this.tokenService.getUser());
  }

  ngOnInit(): void {
  }
  
	sendChangeEmailForm(): void {
		this.accountService.changeEmail(this.form)
			.subscribe((user: Profile) => {
				this.success = true;
				this.error = undefined;
				this.tokenService.saveUser(user);
			}, (errorResponse: HttpErrorResponse) => {
				this.error = errorResponse.error;
				this.success = false;
			});
	}
	
	

}
