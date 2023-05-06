import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AccountComponent } from './account.component';
import { SummaryComponent } from './components/summary/summary.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { ChangePasswordComponent } from './components/changepassword/changepassword.component';
import { AuthGuardService } from '../../services/auth/auth-guard/auth-guard.service';
import { AuthGuardLoggedNotVerifiedService } from '../../services/auth/auth-guard/auth-guard-logged-not-verified.service';
import { AuthGuardLoggedVerifiedService } from '../../services/auth/auth-guard/auth-guard-logged-verified.service';
import { ChangeEmailComponent } from './components/changeemail/changeemail.component';
import { ChangeUsernameComponent } from './components/changeusername/changeusername.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { ChangeProfilePictureComponent } from './components/change-profile-picture/change-profile-picture.component';
import { PostLikeNotificationDescriptionComponent } from './components/notifications/post-like-notification-description/post-like-notification-description.component';
import { PostCommentNotificationDescriptionComponent } from './components/notifications/post-comment-notification-description/post-comment-notification-description.component';
import { UserFollowNotificationDescriptionComponent } from './components/notifications/user-follow-notification-description/user-follow-notification-description.component';
import { VerificationComponent } from './components/verification/verification.component';

const routes: Routes = [
	{
		path: 'account',
		component: AccountComponent,
		children: [
			{
        path: '', component: SummaryComponent
			},
			{
        path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuardLoggedNotVerifiedService]
			},
			{
        path: 'changepassword', component: ChangePasswordComponent, canActivate: [AuthGuardLoggedNotVerifiedService]
			},
			{
        path: 'changeemail', component: ChangeEmailComponent, canActivate: [AuthGuardLoggedNotVerifiedService]
			},
			{
        path: 'changeusername', component: ChangeUsernameComponent, canActivate: [AuthGuardLoggedNotVerifiedService]
			},
			{
        path: 'changeprofilepicture', component: ChangeProfilePictureComponent, canActivate: [AuthGuardLoggedNotVerifiedService]
      },
      {
        path: 'verification', component: VerificationComponent, canActivate: [AuthGuardLoggedVerifiedService]
      }
			
		],
		canActivate: [AuthGuardService]
	},
];

@NgModule({
  declarations: [
    SummaryComponent,
    NavigationComponent,
    ChangePasswordComponent,
	  ChangeEmailComponent,
	  ChangeUsernameComponent,
    NotificationsComponent,
    ChangeProfilePictureComponent,
    PostLikeNotificationDescriptionComponent,
    PostCommentNotificationDescriptionComponent,
    UserFollowNotificationDescriptionComponent,
    VerificationComponent
  ],
  imports: [
    CommonModule,
	  FormsModule,
	  [RouterModule.forChild(routes)]
  ],
  exports: [
	  NavigationComponent,
	  RouterModule
  ]
})
export class AccountModule { }
