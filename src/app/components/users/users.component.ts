import { Component, OnInit } from '@angular/core';
import { Profile } from '../../objects/Profile';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

	private userService: UserService;
	private user?: Profile;
	private error: any;
	private users?: Profile[];

	constructor(userService: UserService) { 
		this.userService = userService;
	}

	testGetPost(id: number): void {
		this.userService.getUser(id)
		.subscribe(user => {
			this.user = user;
			this.showUser();
		}, 
		error => {
			this.error = error;
			this.showError();
		});
	}
	
	testGetAllUsers(): void {
		this.userService.getAllUsers()
		.subscribe(users => {
			this.users = users;
			this.showUsers();
		}, 
		error => {
			this.error = error;
			this.showError();
		});
	}
	
	
	ngOnInit(): void {
	}
	
	setUser(user: Profile): void {
		this.user = user;
	}
	
	showUser(): void {
		console.log(this.user);
	}
	
	showUsers(): void {
		console.log(this.users);
	}
	
	setError(error: any): void {
		this.error = error;
	}
	
	showError(): void {
		console.log(this.error);
	}

}
