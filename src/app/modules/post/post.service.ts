import { Injectable } from '@angular/core';
import { PostView } from './objects/PostView';
import { EditPostForm } from './objects/EditPostForm';
import { LikeDTO } from './objects/LikeDTO';
import { CommentDTO } from './objects/CommentDTO';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

	private http: HttpClient;

	constructor(http: HttpClient) { 
		this.http = http;
	}
  
  	getPost(id: number): Observable<PostView> {
	  	return this.http.get<PostView>('http://192.168.1.114:8080/posts/' + id);
	  }
	
  	getPosts(page: number): Observable<PostView[]> {
		return this.http.get<PostView[]>('http://192.168.1.114:8080/posts/page=' + page);
	}

  	getAllUserPosts(userId: number): Observable<PostView[]> {
		return this.http.get<PostView[]>('http://192.168.1.114:8080/posts/userid=' + userId);
	}

  	getUserPosts(userId: number, page: number): Observable<PostView[]> {
		return this.http.get<PostView[]>('http://192.168.1.114:8080/posts/userid=' + userId + '/page=' + page);
	}
	
  	getAllPosts(): Observable<PostView[]> {
		return this.http.get<PostView[]>('http://192.168.1.114:8080/posts');
	}
	
  	getLikes(postId: number, page: number): Observable<LikeDTO[]> {
		return this.http.get<LikeDTO[]>('http://192.168.1.114:8080/posts/' + postId + '/likes/page=' + page);
	}
	
  	getComments(postId: number, page: number): Observable<CommentDTO[]> {
		return this.http.get<CommentDTO[]>('http://192.168.1.114:8080/posts/' + postId + '/comments/page=' + page);
	}
	
	sendLike(postId: number): Observable<PostView> {
    return this.http.post<PostView>('http://192.168.1.114:8080/posts/' + postId + '/like', { observe: "response" });
	}
	
	sendComment(postId: number, message: string): Observable<PostView> {
		return this.http.post<PostView>('http://192.168.1.114:8080/posts/' + postId + '/comment', message);
  }

  deletePost(postId: number): Observable<any> {
    return this.http.delete<PostView>('http://192.168.1.114:8080/posts/' + postId, { observe: "response" });
  }

  editPost(postId: number, editPostForm: EditPostForm): Observable<any> {
    return this.http.patch<any>('http://192.168.1.114:8080/posts/' + postId, editPostForm, { observe: "response" });
  }

}
