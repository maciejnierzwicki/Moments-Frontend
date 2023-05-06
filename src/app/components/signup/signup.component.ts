import { Component, OnInit } from '@angular/core';
import { SignUpForm } from '../../objects/signupform';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../objects/Profile';
import { AppError } from '../../error';
import { Observable } from 'rxjs';
import { SignUpService } from '../../services/signup/signup.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';

const ERROR_USERNAME_EMPTY: string = "Username cannot be empty.";
const ERROR_PASSWORD_EMPTY: string = "Password cannot be empty.";
const ERROR_EMAIL_EMPTY: string = "Email cannot be empty.";
const ERROR_PASSWORDS_MISMATCH: string = "Both passwords must match.";
const ERROR_OTHER: string = "Error: ";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

	signUpForm: SignUpForm;
	private signUpService: SignUpService;
  error?: string;
  accountCreated: boolean = false;

  constructor(signUpService: SignUpService, private router: Router) {
		this.signUpForm = new SignUpForm();
		this.signUpService = signUpService;
	}

	ngOnInit(): void {
	
	}
	
	sendSignUpForm(): void {
		this.signUpService.sendSignUpRequest(this.signUpForm)
      .subscribe((user: Profile) => {
        this.accountCreated = true;
        setTimeout(() => {
          this.router.navigateByUrl("/signin");
        }, 1500);
			}, (errorResponse: HttpErrorResponse) => {
				this.error = errorResponse.error;
        let error_msg = errorResponse.error;
        switch (error_msg) {
          case "USERNAME_EMPTY": {
            this.error = $localize`${ERROR_USERNAME_EMPTY}`;
            break;

          }
          case "PASSWORD_EMPTY": {
            this.error = $localize`${ERROR_PASSWORD_EMPTY}`;
            break;
          }
          case "PASSWORDS_MISMATCH": {
            this.error = $localize`${ERROR_PASSWORDS_MISMATCH}`;
            break;
          }
          default: {
            this.error = $localize`${ERROR_OTHER}` + error_msg;
          }
        }
			});
	}
	
	

}
