import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikeNotificationDescriptionComponent } from './post-like-notification-description.component';

describe('PostLikeNotificationDescriptionComponent', () => {
  let component: PostLikeNotificationDescriptionComponent;
  let fixture: ComponentFixture<PostLikeNotificationDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostLikeNotificationDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostLikeNotificationDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
