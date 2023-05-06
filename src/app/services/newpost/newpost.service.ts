import { Injectable } from '@angular/core';
import { NewPostForm } from '../../objects/newpostform';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PostView } from '../../modules/post/objects/PostView';

@Injectable({
  providedIn: 'root'
})
export class NewPostService {
  
 	private http: HttpClient;

	constructor(http: HttpClient) { 
		this.http = http;
	}
	
  	sendNewPostRequest(form: NewPostForm): Observable<any> {
		  let data = new FormData();
		  data.append('description', <string>form.description);
		  data.append('image', <File>form.image);
		  return this.http.post('http://192.168.1.114:8080/posts/new', data, {observe: 'response'});
	  }
}
