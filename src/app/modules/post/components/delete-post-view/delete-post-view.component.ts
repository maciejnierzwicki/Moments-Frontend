import { Component, OnInit, DoCheck, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PostService } from '../../post.service';
import { Observable } from 'rxjs';
import { RouterModule, Routes, Router } from '@angular/router';

@Component({
  selector: 'app-delete-post-view',
  templateUrl: './delete-post-view.component.html',
  styleUrls: ['./delete-post-view.component.css']
})
export class DeletePostViewComponent implements OnInit {
  @Input() postId: number = 0;
  private postService: PostService;
  activeModal: NgbActiveModal;
  success: boolean = false;
  error: any = null;

  constructor(postService: PostService, activeModal: NgbActiveModal, private router: Router) {
    this.postService = postService;
    this.activeModal = activeModal;
  }

  ngOnInit(): void {
  }

  deletePost(): void {
    this.postService.deletePost(this.postId).subscribe((response: HttpResponse<any>) => {
      if (response.status == 200) {
        this.success = true;
        setTimeout(() => {
          this.activeModal.dismiss();
          if (this.router.url.startsWith("/post")) {
            this.router.navigateByUrl("/explore");
          }
          else {
            window.location.reload();
          }
        }, 1500);
      }
    }, (errorResponse: HttpErrorResponse) => {
      this.error = errorResponse.error.error;
      }
    );
  }

  setPost(postId: number): void {
    this.postId = postId;
  }

}
