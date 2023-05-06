import { Injectable } from '@angular/core';
import { PasswordResetForm } from '../../objects/PasswordResetForm';
import { PasswordResetConfirmForm } from '../../objects/PasswordResetConfirmForm';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient) { }

  sendPasswordResetRequest(form: PasswordResetForm): Observable<any> {
    return this.http.post('http://192.168.1.114:8080/resetpassword', form, { observe: 'response' });
  }

  sendPasswordResetConfirmRequest(form: PasswordResetConfirmForm): Observable<any> {
    return this.http.post('http://192.168.1.114:8080/resetpassword/confirm', form, { observe: 'response' });
  }
}
