import { Injectable } from '@angular/core';
import { TokenStorageService } from './token-storage/token-storage.service';
import { Profile } from '../../objects/Profile';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

	const httpOptions = {
	  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
	};

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private tokenStorageService: TokenStorageService, private http: HttpClient) { }
  
  public isLoggedUser(): boolean {
	return !!this.tokenStorageService.getToken();
  }
  
  public getLoggedUser(): Profile | null {
	return this.tokenStorageService.getUser();
  }
  
  public updateUser(user: Profile) : void {
	  this.tokenStorageService.saveUser(user);
  }
  
  public signOut(): void {
	this.tokenStorageService.signOut();
  }
  
  public refreshToken(token: string): Observable<any> {
    return this.http.post('http://192.168.1.114:8080/refreshtoken', {
      refreshToken: token
    }, httpOptions);
  }
}
