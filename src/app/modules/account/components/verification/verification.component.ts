import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { AccountService } from '../../account.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Profile } from '../../../../objects/Profile';
import { VerificationCodeConfirmForm } from '../../objects/VerificationCodeConfirmForm';
import { RouterModule, Routes, Router } from '@angular/router';

const ERROR_INVALID_CODE: string = "Verification code is incorrect or it has expired.";
const ERROR_OTHER: string = "Error: ";

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {

  verificationCodeSent: boolean = false;
  accountVerified: boolean = false;
  requestWaiting: boolean = false;
  error?: string;
  verificationCodeConfirmForm: VerificationCodeConfirmForm;


  constructor(private accountService: AccountService, private authService: AuthService, private router: Router) {
    this.verificationCodeConfirmForm = new VerificationCodeConfirmForm();
  }

  ngOnInit(): void {
  }

  sendVerificationCodeRequest(): void {
    if (!this.requestWaiting) {
      this.requestWaiting = true;
    } else return;

    this.accountService.sendVerificationCodeRequest()
      .subscribe(response => {
        this.requestWaiting = false;
        this.error = "";
        this.verificationCodeSent = true;
      }, (errorResponse: HttpErrorResponse) => {
        this.requestWaiting = false;
        let error_msg = errorResponse.error;
        switch (error_msg) {
          default: {
            this.error = $localize`${ERROR_OTHER}` + error_msg;
          }
        }
      });
  }

  sendVerificationCodeConfirmForm(): void {
    this.accountService.sendVerificationCodeConfirmRequest(this.verificationCodeConfirmForm)
      .subscribe(response => {
        this.error = "";
        this.accountVerified = true;
        let user: Profile | null = this.authService.getLoggedUser();
        if (user != null) {
          user.verified = true;
          this.authService.updateUser(user);
          setTimeout(() => {
            this.router.navigateByUrl("/account");
          }, 3000);
       }
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status == 404) {
          this.error = $localize`${ERROR_INVALID_CODE}`;
          return;
        }
        let error_msg = errorResponse.error;
        switch (error_msg) {
          default: {
            this.error = $localize`${ERROR_OTHER}` + error_msg;
          }
        }
      });
  }

}
