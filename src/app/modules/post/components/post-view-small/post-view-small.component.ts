import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PostView } from '../../objects/PostView';
import { TokenStorageService } from '../../../../services/auth/token-storage/token-storage.service';
import { PostService } from '../../post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LikesViewComponent } from '../likes-view/likes-view.component';
import { CommentsViewComponent } from '../comments-view/comments-view.component';

@Component({
  selector: 'post-view-small',
  templateUrl: './post-view-small.component.html',
  styleUrls: ['./post-view-small.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostViewSmallComponent implements OnInit {

	@Input() post: any;
	@Input() homeView: boolean = false;
	private isLoggedIn: boolean;
	private tokenStorage: TokenStorageService;
	private viewerAuthor: boolean = false;
	private postService: PostService;
	comment: string = "";
	private modalService: NgbModal;

  constructor(tokenStorage: TokenStorageService, postService: PostService, modalService: NgbModal) { 
	this.tokenStorage = tokenStorage;
	this.postService = postService;
	this.modalService = modalService;
	this.isLoggedIn = !!this.tokenStorage.getToken();
  }

  ngOnInit(): void {
	this.viewerAuthor = this.tokenStorage.getUser()?.id == this.post.user.id;
  }

  public isLoggedUser(): boolean {
	return this.isLoggedIn;
  }
  
  public isAuthorUser(): boolean {
	return this.viewerAuthor;
  }
  
  sendLike(postId: number): void {
	this.postService.sendLike(postId).subscribe((post: PostView) => {
		window.location.reload();
	
	}, (response: HttpErrorResponse) => {
		let error = response.error;
	});
  }
  
  sendComment(postId: number): void {
	this.postService.sendComment(postId, this.comment).subscribe((post: PostView) => {
		window.location.reload();
	
	}, (response: HttpErrorResponse) => {
		let error = response.error;
	});
  }
  
  openLikes(): void {
	const modal = this.modalService.open(LikesViewComponent);
	modal.componentInstance.setPost(this.post.id);
  }
  
  openComments(): void {
	const modal = this.modalService.open(CommentsViewComponent);
	modal.componentInstance.setPost(this.post.id);
  }

}
