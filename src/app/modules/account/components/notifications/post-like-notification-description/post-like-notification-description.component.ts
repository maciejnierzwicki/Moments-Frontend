import { Component, OnInit, Input } from '@angular/core';
import { NotificationDTO } from '../NotificationDTO';
import { formatDate } from '@angular/common';

@Component({
  selector: 'post-like-notification-description',
  templateUrl: './post-like-notification-description.component.html',
  styleUrls: ['./post-like-notification-description.component.css']
})
export class PostLikeNotificationDescriptionComponent implements OnInit {


  @Input() notification: any;


  constructor() { }

  ngOnInit(): void {
  }

  private getFormattedDate(date: Date): string {
    return formatDate(date, 'MM.dd.yy HH:mm', 'en-US');
  }

}
