import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../post.service';
import { Observable } from 'rxjs';
import { LikeDTO } from '../../objects/LikeDTO';

@Component({
  selector: 'app-likes-view',
  templateUrl: './likes-view.component.html',
  styleUrls: ['./likes-view.component.css']
})
export class LikesViewComponent implements OnInit {

	@Input() postId: number = 0;
	likes: LikeDTO[] = [];
	page = 0;
	private postService: PostService;
	activeModal: NgbActiveModal;

	constructor(postService: PostService, activeModal: NgbActiveModal) { 
		this.postService = postService;
		this.activeModal = activeModal;
		this.page = 0;
	}
	
  loadLikes(postId: number, page: number): void {
	this.postService.getLikes(postId, page).subscribe((likes: LikeDTO[]) => {
		let loadedLikes = likes;
		this.updateItems(loadedLikes);
	});
  }
  
  /* INFINITE SCROLL - START */
  onScrollDown(event: any) {
    this.appendItems();
  }
  
  updateItems(likesToAdd: LikeDTO[]): void {
	  this.likes = this.likes.concat(likesToAdd);
  }

  appendItems() {
    this.addLikes(++this.page);
  }

  addLikes(page: number) {
	  this.loadLikes(this.postId, page);
  }
  /* INFINITE SCROLL - END */

  ngOnInit(): void {
  }

  
  setPost(postId: number): void {
	  this.postId = postId;
	  this.loadLikes(this.postId, this.page);
  }

}
