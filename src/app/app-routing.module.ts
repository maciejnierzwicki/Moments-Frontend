import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PostComponent } from './modules/post/post.component';
import { ExploreComponent } from './components/explore/explore.component';
import { UsersComponent } from './components/users/users.component';
import { UserComponent } from './components/user/user.component';
import { SignInComponent } from './components/signin/signin.component';
import { SignUpComponent } from './components/signup/signup.component';
import { AccountComponent } from './modules/account/account.component';
import { SummaryComponent } from './modules/account/components/summary/summary.component';
import { NewPostComponent } from './components/newpost/newpost.component';
import { AuthGuardLoggedService } from './services/auth/auth-guard/auth-guard-logged.service';
import { AuthGuardLoggedNotVerifiedService } from './services/auth/auth-guard/auth-guard-logged-not-verified.service';
import { AuthGuardService } from './services/auth/auth-guard/auth-guard.service';
import { HomeComponent } from './components/home/home.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	},
	{
		path: 'explore',
    component: ExploreComponent
	},
	{
		path: 'users',
		component: UsersComponent
	},
	{
		path: 'user/:id',
		component: UserComponent
	},
	{
		path: 'signin',
		component: SignInComponent,
		canActivate: [AuthGuardLoggedService]
	},
	{
		path: 'signup',
		component: SignUpComponent,
		canActivate: [AuthGuardLoggedService]
	},
	{
		path: 'newpost',
		component: NewPostComponent,
    canActivate: [AuthGuardService, AuthGuardLoggedNotVerifiedService]
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
    canActivate: [AuthGuardLoggedService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
