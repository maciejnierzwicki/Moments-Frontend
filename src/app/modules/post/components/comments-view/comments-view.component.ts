import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../post.service';
import { Observable } from 'rxjs';
import { CommentDTO } from '../../objects/CommentDTO';

@Component({
  selector: 'app-comments-view',
  templateUrl: './comments-view.component.html',
  styleUrls: ['./comments-view.component.css']
})
export class CommentsViewComponent implements OnInit {

	@Input() postId: number = 0;
	comments: CommentDTO[] = [];
	page = 0;
	private postService: PostService;
	activeModal: NgbActiveModal;
	
	constructor(postService: PostService, activeModal: NgbActiveModal) { 
		this.postService = postService;
		this.activeModal = activeModal;
		this.page = 0;
	}

  loadComments(postId: number, page: number): void {
	this.postService.getComments(postId, page).subscribe((comments: CommentDTO[]) => {
		let loadedComments = comments;
		this.updateItems(loadedComments);
	});
  }
  
  /* INFINITE SCROLL - START */
  onScrollDown(event: any) {
    this.appendItems();
  }
  
  updateItems(commentsToAdd: CommentDTO[]): void {
	  this.comments = this.comments.concat(commentsToAdd);
  }

  appendItems() {
    this.addComments(++this.page);
  }

  addComments(page: number) {
	  this.loadComments(this.postId, page);
  }
  /* INFINITE SCROLL - END */

  ngOnInit(): void {
  }

  
  setPost(postId: number): void {
	  this.postId = postId;
	  this.loadComments(this.postId, this.page);
  }

}
