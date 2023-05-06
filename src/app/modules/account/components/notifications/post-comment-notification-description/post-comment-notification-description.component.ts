import { Component, OnInit, Input } from '@angular/core';
import { NotificationDTO } from '../NotificationDTO';
import { formatDate } from '@angular/common';

@Component({
  selector: 'post-comment-notification-description',
  templateUrl: './post-comment-notification-description.component.html',
  styleUrls: ['./post-comment-notification-description.component.css']
})
export class PostCommentNotificationDescriptionComponent implements OnInit {


  @Input() notification: any;


  constructor() { }

  ngOnInit(): void {
  }

  private getFormattedDate(date: Date): string {
    return formatDate(date, 'MM.dd.yy HH:mm', 'en-US');
  }

}
