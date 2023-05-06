import { Component, OnInit } from '@angular/core';
import { ChangePasswordForm } from './changepassword.form';
import { AccountService } from '../../account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Profile } from '../../../../objects/Profile';
import { AppError } from '../../../../error';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangePasswordComponent implements OnInit {

	form: ChangePasswordForm;
	private accountService: AccountService;
	error?: AppError;
	success: boolean = false;

  constructor(accountService: AccountService) { 
	this.accountService = accountService;
	this.form = new ChangePasswordForm();
  }

  ngOnInit(): void {
  }
  
	sendChangePasswordForm(): void {
		this.accountService.changePassword(this.form)
			.subscribe((user: Profile) => {
				this.success = true;
				this.error = undefined;
			}, (errorResponse: HttpErrorResponse) => {
				this.error = errorResponse.error;
				this.success = false;
			});
	}

}
