import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { PostView } from '../../objects/PostView';
import { AuthService } from '../../../../services/auth/auth.service';
import { PostService } from '../../post.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LikesViewComponent } from '../likes-view/likes-view.component';
import { CommentsViewComponent } from '../comments-view/comments-view.component';
import { DeletePostViewComponent } from '../delete-post-view/delete-post-view.component';
import { EditPostViewComponent } from '../edit-post-view/edit-post-view.component';
import { NewCommentComponent } from '../new-comment/new-comment.component';
import { faHeart, faComment, faFilePen, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostViewComponent implements OnInit {

	@Input() post: any;
	private isLoggedIn: boolean;
	private authService: AuthService;
	private viewerAuthor: boolean = false;
	private postService: PostService;
	comment: string = "";
  private modalService: NgbModal;
  faHeart = faHeart;
  faComment = faComment;
  faFilePen = faFilePen;
  faX = faX;

  constructor(authService: AuthService, postService: PostService, modalService: NgbModal) { 
	  this.authService = authService;
	  this.postService = postService;
	  this.modalService = modalService;
    this.isLoggedIn = !!this.authService.isLoggedUser();
  }

  ngOnInit(): void {
    this.viewerAuthor = this.authService.getLoggedUser()?.id == this.post.author.id;
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
	  const modal = this.modalService.open(LikesViewComponent, { centered: true });
	  modal.componentInstance.setPost(this.post.id);
  }

  openEditPost(): void {
    const modal = this.modalService.open(EditPostViewComponent, { centered: true });
    modal.componentInstance.setPostId(this.post.id);
    modal.componentInstance.setEditPostFormOfPost(this.post);
  }

  openDeletePost(): void {
    const modal = this.modalService.open(DeletePostViewComponent, { centered: true });
    modal.componentInstance.setPost(this.post.id);
  }
  
  openComments(): void {
	  const modal = this.modalService.open(CommentsViewComponent, { centered: true });
	  modal.componentInstance.setPost(this.post.id);
  }
  
  openNewComment(): void {
	  const modal = this.modalService.open(NewCommentComponent, { centered: true });
	  modal.componentInstance.setPost(this.post.id);
  }

}
