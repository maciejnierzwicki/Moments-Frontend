import { Injectable } from '@angular/core';
import { Profile } from '../../objects/Profile';
import { NotificationDTO } from './components/notifications/NotificationDTO';
import { ChangePasswordForm } from './components/changepassword/changepassword.form';
import { ChangeEmailForm } from './components/changeemail/changeemail.form';
import { ChangeUsernameForm } from './components/changeusername/changeusername.form';
import { ProfilePictureForm } from './components/change-profile-picture/profilepicture.form';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationsResponse } from './components/notifications/NotificationsResponse';
import { VerificationCodeConfirmForm } from './objects/VerificationCodeConfirmForm';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

	private http: HttpClient;

	constructor(http: HttpClient) { 
		this.http = http;
	}
	
	changePassword(form: ChangePasswordForm): Observable<Profile> {
		return this.http.post<Profile>('http://192.168.1.114:8080/account/changepassword', form);
	}
	
	changeEmail(form: ChangeEmailForm): Observable<Profile> {
		return this.http.post<Profile>('http://192.168.1.114:8080/account/changeemail', form);
	}
	
	changeUsername(form: ChangeUsernameForm): Observable<Profile> {
		return this.http.post<Profile>('http://192.168.1.114:8080/account/changeusername', form);
	}
	
	changeProfilePicture(form: ProfilePictureForm): Observable<any> {
		let data = new FormData();
		data.append('image', <File>form.image);
		console.log(data);
		return this.http.post('http://192.168.1.114:8080/account/changeprofilepicture', data, {observe: 'response'});
	}
	
  getNotifications(onlyCount: boolean, onlyUnread: boolean): Observable<NotificationsResponse> {
		return this.http.get<NotificationsResponse>('http://192.168.1.114:8080/account/notifications?onlyCount=' + onlyCount + '&onlyUnread=' + onlyUnread);
  }

  markNotificationAsRead(id: Number): Observable<any> {
    return this.http.post('http://192.168.1.114:8080/account/notifications-mark-single-read?id=' + id, {observe: 'response'});
  }

  sendVerificationCodeRequest(): Observable<any> {
    return this.http.post('http://192.168.1.114:8080/account/verification', { observe: 'response' });
  }

  sendVerificationCodeConfirmRequest(form: VerificationCodeConfirmForm): Observable<any> {
    return this.http.post('http://192.168.1.114:8080/account/verification/confirm', form, { observe: 'response' });
  }
	

}
