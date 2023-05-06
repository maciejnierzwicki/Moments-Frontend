import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCommentNotificationDescriptionComponent } from './post-comment-notification-description.component';

describe('PostCommentNotificationDescriptionComponent', () => {
  let component: PostCommentNotificationDescriptionComponent;
  let fixture: ComponentFixture<PostCommentNotificationDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostCommentNotificationDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCommentNotificationDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
