import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { SignInForm } from '../../objects/signinform';
import { FormsModule } from '@angular/forms';
import { Profile } from '../../objects/Profile';
import { AppError } from '../../error';
import { Observable } from 'rxjs';
import { SignInService } from '../../services/signin/signin.service';
import { TokenStorageService } from '../../services/auth/token-storage/token-storage.service';
import { JwtResponse } from '../../objects/jwt.response';
import { RouterModule, Routes, Router } from '@angular/router';

const ERROR_INCORRECT_USERNAME_OR_PASSWORD: string = "Incorrect username or password.";
const ERROR_USERNAME_EMPTY: string = "Username cannot be empty.";
const ERROR_PASSWORD_EMPTY: string = "Password cannot be empty.";
const ERROR_OTHER: string = "Error: ";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {


  private signInService: SignInService;
  private tokenService: TokenStorageService;
  error?: string;
  signInForm: SignInForm;

	constructor(signInService: SignInService, tokenService: TokenStorageService, private router: Router) { 
		this.signInForm = new SignInForm();
		this.signInService = signInService;
		this.tokenService = tokenService;
	}

	ngOnInit(): void {
	}
	
	sendSignInForm(): void {
		this.signInService.sendSignInRequest(this.signInForm)
			.subscribe(response => {
				let token = response.headers.get('Authorization');
				const jwtResponse: JwtResponse = response.body;
				this.tokenService.saveToken(token);
        this.tokenService.saveRefreshToken(jwtResponse.refreshToken);
        let user: Profile = jwtResponse.user;
				this.tokenService.saveUser(user);
        if (user.verified) {
          this.router.navigateByUrl("/account");
        }
        else {
          this.router.navigateByUrl("/account/verification");
        }
      }, (errorResponse: HttpErrorResponse) => {
        let error_msg = errorResponse.error;
        switch (error_msg) {
          case "INCORRECT_USERNAME_OR_PASSWORD": {
            this.error = $localize`${ERROR_INCORRECT_USERNAME_OR_PASSWORD}`;
            break;

          }
          case "USERNAME_EMPTY": {
            this.error = $localize`${ERROR_USERNAME_EMPTY}`;
            break;

          }
          case "PASSWORD_EMPTY": {
            this.error = $localize`${ERROR_PASSWORD_EMPTY}`;
            break;
          }
          default: {
            this.error = $localize`${ERROR_OTHER}` + error_msg;
          }
        }
			});
	}

}
