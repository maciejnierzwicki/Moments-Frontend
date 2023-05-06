import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../post.service';
import { PostView } from '../../objects/PostView';
import { Observable } from 'rxjs';
import { EditPostForm } from '../../objects/EditPostForm';

@Component({
  selector: 'app-edit-post-view',
  templateUrl: './edit-post-view.component.html',
  styleUrls: ['./edit-post-view.component.css']
})
export class EditPostViewComponent implements OnInit {
  private postId: number = 0;
  private postService: PostService;
  activeModal: NgbActiveModal;
  success: boolean = false;
  error: any = null;
  editPostForm: EditPostForm = new EditPostForm();


  constructor(postService: PostService, activeModal: NgbActiveModal) {
    this.postService = postService;
    this.activeModal = activeModal;
  }

  ngOnInit(): void {
  }

  setEditPostFormOfPost(post: PostView): void {
    this.editPostForm.description = post.description;
  }

  setPostId(postId: number): void {
    this.postId = postId;
  }

  editPost(): void {
    this.postService.editPost(this.postId, this.editPostForm).subscribe((response: HttpResponse<any>) => {
      if (response.status == 200) {
        this.success = true;
        setTimeout(() => {
          this.activeModal.dismiss();
          window.location.reload();
        }, 1500);
      }
    }, (errorResponse: HttpErrorResponse) => {
      this.error = errorResponse.error.error;
    }
    );
  }

}
