import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './post.component';
import { RouterModule, Routes } from '@angular/router';
import { PostViewComponent } from './components/post-view/post-view.component';
import { PostViewSmallComponent } from './components/post-view-small/post-view-small.component';
import { FormsModule } from '@angular/forms';
import { LikesViewComponent } from './components/likes-view/likes-view.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommentsViewComponent } from './components/comments-view/comments-view.component';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { DeletePostViewComponent } from './components/delete-post-view/delete-post-view.component';
import { EditPostViewComponent } from './components/edit-post-view/edit-post-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const routes: Routes = [
	{
		path: 'post/:id',
		component: PostComponent
	},
];



@NgModule({
  declarations: [
	PostViewComponent,
	LikesViewComponent,
	PostViewSmallComponent,
	CommentsViewComponent,
 NewCommentComponent,
 DeletePostViewComponent,
 EditPostViewComponent
  ],
  imports: [
    CommonModule,
	FormsModule,
    InfiniteScrollModule,
    FontAwesomeModule,
	[RouterModule.forChild(routes)]
  ],
  exports: [
  	PostViewComponent,
	LikesViewComponent,
	PostViewSmallComponent,
	RouterModule
  ]
})
export class PostModule { }
