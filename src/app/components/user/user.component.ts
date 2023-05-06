import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot, Params } from '@angular/router';
import { Profile } from '../../objects/Profile';
import { TrackingDTO } from '../../objects/TrackingDTO';
import { PostView } from '../../modules/post/objects/PostView';
import { UserService } from '../../services/user/user.service';
import { PostService } from '../../modules/post/post.service';
import { TokenStorageService } from '../../services/auth/token-storage/token-storage.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user?: Profile;
  isFollowed: boolean = false;
	private userService: UserService;
	private postService: PostService;
	posts: PostView[] = [];
	page = 0;
	postsChunked: Map<number, PostView[]>;
	postsInChunk = 3;
	private tokenStorage: TokenStorageService;
	private lastUpdateTime = 0;
	private updateCooldown = 1500;


  constructor(route: ActivatedRoute, userService: UserService, postService: PostService, tokenStorage: TokenStorageService) { 
		this.userService = userService;
		this.postService = postService;
		this.tokenStorage = tokenStorage;
		this.page = 0;
		this.postsChunked = new Map<number, PostView[]>;
		route.params.subscribe((params: Params) => {
			let id = params['id'];
			this.loadUser(id);
		}); 
 
  }
  
  updateRefreshTime(): void {
	this.lastUpdateTime = Date.now();
  }


  loadAllPosts(): void {
	  let now = Date.now();
	  if(now - this.lastUpdateTime < this.updateCooldown) {  return; }
  	  if(this.user) {
		    this.postService.getAllUserPosts(this.user.id).subscribe((posts: PostView[]) => {
			    this.posts = posts;
			    this.chunkPosts();
			    this.updateRefreshTime();
			
		    });
	    }
  }
  
  chunkPosts(): void {
	  let chunked = new Map<number, PostView[]>;
	  let chunks = this.posts.length / this.postsInChunk;
	  let lastChunkElements = this.posts.length % this.postsInChunk;
	  for(var i = 1; i <= chunks; i++) {
		  let chunk = new Array<PostView>;
		  let start = (i * this.postsInChunk) - this.postsInChunk;
		  let end = (i * this.postsInChunk) - 1;
		  while(start <= end) {
			  chunk.push(this.posts[start]);
			  start++;
		  }
		  chunked.set(i, chunk);
	  }
	  if(lastChunkElements > 0) {
		  let start = this.posts.length - lastChunkElements;
		  let end = this.posts.length - 1;
		  let chunk = new Array<PostView>;
		  while(start <= end) {
			  chunk.push(this.posts[start]);
			  start++;
		  }
		  chunked.set(chunked.size + 1, chunk);
	  }
	  this.postsChunked = chunked;
  }
  
  loadPosts(): void {
  	let now = Date.now();
	if(now - this.lastUpdateTime < this.updateCooldown) { return; }
  	if(this.user) {
			this.postService.getUserPosts(this.user.id, this.page).subscribe((posts: PostView[]) => {
				let loadedPosts = posts;
				if(loadedPosts.length > 0) {
					// performance boost
					this.updateItems(loadedPosts);
					this.chunkPosts();
					this.page++;
				}
				this.updateRefreshTime();
			});
		}
  }




  ngOnInit(): void {
  }
  
  loadUser(id: number) {
	this.userService.getUser(id).subscribe((user: Profile) => {
    this.user = user;
    this.userService.getTrackingOfUser(this.user.id).subscribe((tracking: TrackingDTO) => {
      this.isFollowed = tracking != null;
    }, (errorResponse: HttpErrorResponse) => {
      
    });
    this.isFollowed = this.userService.getTrackingOfUser(this.user.id) != null;
		this.loadPosts();
	});
  }
  
  followUser(): void {
	if(this.user) {
		this.userService.followUser(this.user.id).subscribe(() => {
			location.reload();
		});
	}
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
  
  public getLoggedUser(): Profile | null {
	return this.tokenStorage.getUser();
  }
  /* INFINITE SCROLL - END */

}
