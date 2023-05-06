import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowNotificationDescriptionComponent } from './user-follow-notification-description.component';

describe('UserFollowNotificationDescriptionComponent', () => {
  let component: UserFollowNotificationDescriptionComponent;
  let fixture: ComponentFixture<UserFollowNotificationDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFollowNotificationDescriptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserFollowNotificationDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
