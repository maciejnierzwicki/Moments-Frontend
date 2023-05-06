import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { WildcardRoutingModule } from './modules/wildcard-routing/wildcard-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './components/users/users.component';
import { SignInComponent } from './components/signin/signin.component';
import { SignUpComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AccountComponent } from './modules/account/account.component';
import { NavigationComponent } from './modules/account/components/navigation/navigation.component';
import { AccountModule } from './modules/account/account.module';
import { PostModule } from './modules/post/post.module';
//import { UserModule } from './user/user.module';
import { NewPostComponent } from './components/newpost/newpost.component';
import { authInterceptorProviders } from './services/auth/auth.interceptor';
import { PostComponent } from './modules/post/post.component';
import { ExploreComponent } from './components/explore/explore.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { UserComponent } from './components/user/user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LikesViewComponent } from './modules/post/components/likes-view/likes-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotificationsBarComponent } from './components/notifications-bar/notifications-bar.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
	PostComponent,
	ExploreComponent,
    UsersComponent,
	UserComponent,
    SignInComponent,
    SignUpComponent,
    AccountComponent,
    NewPostComponent,
    UserComponent,
    MainNavigationComponent,
    HomeComponent,
    FooterComponent,
    NotificationsBarComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
	HttpClientModule,
	FormsModule,
	AccountModule,
	PostModule,
	InfiniteScrollModule,
	NgbModule,
	FontAwesomeModule,
	WildcardRoutingModule
  ],
  entryComponents: [
	LikesViewComponent
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
