import { Component, OnInit } from '@angular/core';
import { PasswordResetForm } from '../../objects/PasswordResetForm';
import { PasswordResetConfirmForm } from '../../objects/PasswordResetConfirmForm';
import { ResetPasswordService } from '../../services/reset-password/reset-password.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';


const ERROR_NO_USER: string = "No user with given email address found.";
const ERROR_INVALID_CODE: string = "Password reset code is incorrect or it has expired.";
const ERROR_RESET_CODE_LENGTH: string = "Password reset code must contain 6 digits.";
const ERROR_PASSWORD_EMPTY: string = "Password cannot be empty.";
const ERROR_EMAIL_INVALID: string = "Email address is incorrect.";
const ERROR_PASSWORDS_MISMATCH: string = "Both passwords must match.";
const ERROR_OTHER: string = "Error: ";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  passwordCodeSent: boolean = false;
  passwordChanged: boolean = false;
  requestWaiting: boolean = false;
  error?: string;
  passwordResetForm: PasswordResetForm;
  passwordResetConfirmForm: PasswordResetConfirmForm;
  resetPasswordService: ResetPasswordService;

  constructor(resetPasswordService: ResetPasswordService) {
    this.passwordResetForm = new PasswordResetForm();
    this.passwordResetConfirmForm = new PasswordResetConfirmForm();
    this.resetPasswordService = resetPasswordService;
  }

  ngOnInit(): void {
  }

  sendPasswordResetForm(): void {
    if (!this.requestWaiting) { 
       this.requestWaiting = true;
    } else return;

    this.resetPasswordService.sendPasswordResetRequest(this.passwordResetForm)
      .subscribe(response => {
        this.requestWaiting = false;
        this.error = "";
        this.passwordCodeSent = true;
      }, (errorResponse: HttpErrorResponse) => {
        this.requestWaiting = false;
        if (errorResponse.status == 404) {
          this.error = $localize`${ERROR_NO_USER}`;
          return;
        }
        let error_msg = errorResponse.error;
        switch (error_msg) {
          case "EMAIL_EMPTY": {
            this.error = $localize`${ERROR_PASSWORD_EMPTY}`;
            break;
          }
          case "EMAIL_INVALID": {
            this.error = $localize`${ERROR_EMAIL_INVALID}`;
            break;
          }
          default: {
            this.error = $localize`${ERROR_OTHER}` + error_msg;
          }
        }
      });
  }

  sendPasswordResetConfirmForm(): void {
    this.resetPasswordService.sendPasswordResetConfirmRequest(this.passwordResetConfirmForm)
      .subscribe(response => {
        this.error = "";
        this.passwordChanged = true;
      }, (errorResponse: HttpErrorResponse) => {
        if (errorResponse.status == 404) {
          this.error = $localize`${ERROR_INVALID_CODE}`;
          return;
        }
        let error_msg = errorResponse.error;
        switch (error_msg) {
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
