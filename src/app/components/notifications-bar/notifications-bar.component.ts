import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { AuthService } from '../../services/auth/auth.service';
import { AccountService } from '../../modules/account/account.service';
import { NotificationDTO } from '../../modules/account/components/notifications/NotificationDTO';
import { NotificationsResponse } from '../../modules/account/components/notifications/NotificationsResponse';

@Component({
  selector: 'notifications-bar',
  templateUrl: './notifications-bar.component.html',
  styleUrls: ['./notifications-bar.component.css']
})
export class NotificationsBarComponent implements OnInit {

  notificationsCount: Number = 0;

  constructor(private authService: AuthService, private accountService: AccountService) { }

  ngOnInit(): void {
	  setInterval(() => { this.countAllNotifications() }, 5000);
  }
  
  public isLoggedUser(): boolean {
	  return this.authService.isLoggedUser();
  }
  
  countAllNotifications(): void {
    if (!this.isLoggedUser()) return;
	  this.accountService.getNotifications(true, true).subscribe((response: NotificationsResponse) => {
      this.notificationsCount = response.count;
	  });
  }
  
  

}
