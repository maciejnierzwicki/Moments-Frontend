import { Component, OnInit} from '@angular/core';
import { AppComponent } from '../../app.component';
import { PostView } from '../../modules/post/objects/PostView';
import { PostService } from '../../modules/post/post.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

	private postService: PostService;
	private error: any;
	posts: PostView[] = [];
	page = 0;
	private lastUpdateTime = 0;
	private updateCooldown = 1500;

	constructor(postService: PostService) { 
		this.postService = postService;
	}
	
  loadAllPosts(): void {
	this.postService.getAllPosts().subscribe((posts: PostView[]) => {
		this.posts = posts;
	});
  }
  
  updateRefreshTime(): void {
	this.lastUpdateTime = Date.now();
  }
  
  loadPosts(): void {
	let now = Date.now();
	if(now - this.lastUpdateTime < this.updateCooldown) { return; }
	this.postService.getPosts(this.page).subscribe((posts: PostView[]) => {
		let loadedPosts = posts;
		if(loadedPosts.length > 0) {
			this.updateItems(loadedPosts);
			this.page++;
		}
		this.updateRefreshTime();
	});
  }
  
   ngOnInit(): void {
   		this.page = 0;
     this.loadPosts();
   }
  
  /* INFINITE SCROLL - START */
  onScrollDown(event: any) {
    this.appendItems();
  }
  
  updateItems(postsToAdd: PostView[]): void {
	this.posts = this.posts.concat(postsToAdd);
  }

  appendItems() {
    this.addPosts();
  }

  addPosts() {
	this.loadPosts();
  }

  /* INFINITE SCROLL - END */

}
