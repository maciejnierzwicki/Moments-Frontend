import { Component, OnInit } from '@angular/core';
import { PostView } from './objects/PostView';
import { Router, ActivatedRoute, RouterStateSnapshot, Params } from '@angular/router';
import { PostService } from './post.service';
import { TokenStorageService } from '../../services/auth/token-storage/token-storage.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

	public post?: PostView;
	private postService: PostService;
	private isLoggedIn: boolean;
	private tokenStorage: TokenStorageService;

	constructor(route: ActivatedRoute, postService: PostService, tokenStorage: TokenStorageService) {
		this.tokenStorage = tokenStorage;
		this.isLoggedIn = !!this.tokenStorage.getToken();
		this.postService = postService;
		route.params.subscribe((params: Params) => {
			let id = params['id'];
			this.loadPost(id);
		});
	}

  ngOnInit(): void {
  }
  
  loadPost(id: number) {
	this.postService.getPost(id).subscribe((post: PostView) => {
		this.post = post;
	});
  }
  
  public isLoggedUser(): boolean {
	  return this.isLoggedIn;
  }

}
