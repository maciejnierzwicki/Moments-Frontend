import { Component, OnInit, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../post.service';
import { Observable } from 'rxjs';
import { PostView } from '../../objects/PostView';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

	@Input() postId: number = 0;
	private postService: PostService;
	activeModal: NgbActiveModal;
	comment: string = "";

  constructor(postService: PostService, activeModal: NgbActiveModal) { 
		this.postService = postService;
		this.activeModal = activeModal;
  }

  ngOnInit(): void {
  }
  
  setPost(postId: number): void {
	this.postId = postId;
  }
  
  sendComment(postId: number): void {
	this.postService.sendComment(postId, this.comment).subscribe((post: any) => {
		window.location.reload();
	
	}, (response: HttpErrorResponse) => {
    let error = response.error;
	});
  }

}
