import { Injectable } from '@angular/core';
import { Profile } from '../../objects/Profile';
import { TrackingDTO } from '../../objects/TrackingDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	private http: HttpClient;

	constructor(http: HttpClient) { 
		this.http = http;
	}
  
  	getUser(id: number): Observable<Profile> {
		return this.http.get<Profile>('http://192.168.1.114:8080/users/' + id);
	}
	
  	getAllUsers(): Observable<Profile[]> {
		return this.http.get<Profile[]>('http://192.168.1.114:8080/users');
	}
	
	followUser(id: number): Observable<any> {
		return this.http.post<any>('http://192.168.1.114:8080/users/' + id + '/follow', null);
  }

  getTrackingOfUser(id: number): Observable<TrackingDTO> {
    return this.http.get<TrackingDTO>('http://192.168.1.114:8080/users/' + id + '/tracking');
  }

}
