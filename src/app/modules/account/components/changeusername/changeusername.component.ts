import { Component, OnInit } from '@angular/core';
import { ChangeUsernameForm } from './changeusername.form';
import { AccountService } from '../../account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../../../../objects/Profile';
import { AppError } from '../../../../error';
import { FormsModule } from '@angular/forms';
import { TokenStorageService } from '../../../../services/auth/token-storage/token-storage.service';

@Component({
  selector: 'app-changeusername',
  templateUrl: './changeusername.component.html',
  styleUrls: ['./changeusername.component.css']
})
export class ChangeUsernameComponent implements OnInit {

	form: ChangeUsernameForm;
	private accountService: AccountService;
	error?: AppError;
	success: boolean = false;
	private tokenService: TokenStorageService;

  constructor(accountService: AccountService, tokenService: TokenStorageService) { 
  	this.accountService = accountService;
	this.tokenService = tokenService;
	this.form = new ChangeUsernameForm();
	this.form.apply(<Profile>this.tokenService.getUser());
  }

  ngOnInit(): void {
  }
  
	sendChangeUsernameForm(): void {
		this.accountService.changeUsername(this.form)
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
