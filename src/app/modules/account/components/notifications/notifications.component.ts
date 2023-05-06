import { Component, OnInit } from '@angular/core';
import { NotificationDTO } from './NotificationDTO';
import { AccountService } from '../../account.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { NotificationsResponse } from './NotificationsResponse';
import { PostView } from '../../../post/objects/PostView';
import { Profile } from '../../../../objects/Profile';
import { NotificationType } from './NotificationType';
import { PostLikeNotificationDescriptionComponent } from './post-like-notification-description/post-like-notification-description.component';
import { PostCommentNotificationDescriptionComponent } from './post-comment-notification-description/post-comment-notification-description.component';
import { UserFollowNotificationDescriptionComponent } from './user-follow-notification-description/user-follow-notification-description.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

	private accountService: AccountService;
	notifications: NotificationDTO[] = [];
	

  constructor(accountService: AccountService) {
	this.accountService = accountService;
	this.notifications = [];
  }

  ngOnInit(): void {
	this.loadAllNotifications();
  }
  
  loadAllNotifications(): void {
    this.accountService.getNotifications(false, false).subscribe((response: NotificationsResponse) => {
      this.notifications = response.notifications;
	  });
  }

  private getPostLink(post: PostView): string {
    return "/post/" + post.id + "\\";
  }

  private getUserLink(user: Profile): string {
    return "/user/" + user.id + "\\";
  }

  getLink(notification: NotificationDTO): string {
    let link: string = "";
    switch (notification.notificationType.toString()) {
      case "POST_LIKE": {
        link = this.getPostLink(notification.post);
        break;
      }
      case "POST_COMMENT": {
        link = this.getPostLink(notification.post);
        break;
      }
      case "USER_FOLLOW": {
        link = this.getUserLink(notification.tracking.user);
        break;
      }
    }
    return link;
  }


  markAsRead(notification: NotificationDTO): void {
    if (notification.read) return;
    window.alert("Marking as read");
    this.accountService.markNotificationAsRead(notification.id).subscribe((response: any) => {
    }, (errorResponse: HttpErrorResponse) => {});
  }

}
