import { Injectable } from '@angular/core';
import { SignInForm } from '../../objects/signinform';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignInService {
  
 	  private http: HttpClient;

	  constructor(http: HttpClient) { 
		  this.http = http;
	  }
	
  	sendSignInRequest(form: SignInForm): Observable<any> {
		  return this.http.post('http://192.168.1.114:8080/signin', form, {observe: 'response'});
	  }
}
