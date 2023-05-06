import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NewPostForm } from '../../objects/newpostform';
import { NewPostService } from '../../services/newpost/newpost.service';
import { PostView } from '../../modules/post/objects/PostView';
import { AppError } from '../../error';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.css']
})
export class NewPostComponent implements OnInit {

	newPostForm: NewPostForm;
	private newPostService: NewPostService;
	error = undefined;
	sendSuccess = false;

	constructor(newPostService: NewPostService, private router: Router) { 
		this.newPostForm = new NewPostForm();
		this.newPostService  = newPostService;
	}

	ngOnInit(): void { }
	
	
	sendNewPostForm(): void {
		this.newPostService.sendNewPostRequest(this.newPostForm)
			.subscribe(response => {
				let post: PostView = response.body;
				this.error = undefined;
				this.sendSuccess = true;
				setTimeout(() => {
					this.router.navigateByUrl("/post/" + post.id);
				}, 1500);
			}, (errorResponse: HttpErrorResponse) => {
				this.error = errorResponse.error.error;
			});
	}
	
	
	setImage(event: Event): void {
		let target: EventTarget = <EventTarget>event.target;
		if(target) {
			let files: FileList = <FileList>(target as HTMLInputElement).files;
			this.newPostForm.image = files[0];
		}
	}

}
