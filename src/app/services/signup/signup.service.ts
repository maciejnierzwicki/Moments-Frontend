import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../../objects/Profile';
import { SignUpForm } from '../../objects/signupform';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

	private http: HttpClient;

	constructor(http: HttpClient) { 
		this.http = http;
	}
	
  	sendSignUpRequest(form: SignUpForm): Observable<Profile> {
		return this.http.post<Profile>('http://192.168.1.114:8080/signup', form);
	}
}
