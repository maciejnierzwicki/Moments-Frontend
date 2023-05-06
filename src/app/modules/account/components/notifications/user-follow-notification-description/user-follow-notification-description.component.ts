import { Component, OnInit, Input } from '@angular/core';
import { NotificationDTO } from '../NotificationDTO';
import { formatDate } from '@angular/common';

@Component({
  selector: 'user-follow-notification-description',
  templateUrl: './user-follow-notification-description.component.html',
  styleUrls: ['./user-follow-notification-description.component.css']
})
export class UserFollowNotificationDescriptionComponent implements OnInit {


  @Input() notification: any;


  constructor() { }

  ngOnInit(): void {
  }

  private getFormattedDate(date: Date): string {
    return formatDate(date, 'MM.dd.yy HH:mm', 'en-US');
  }

}
