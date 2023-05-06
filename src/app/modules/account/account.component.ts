import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../services/auth/token-storage/token-storage.service';
import { Profile } from '../../objects/Profile';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

	private tokenStorage: TokenStorageService;

  constructor(tokenStorage: TokenStorageService) { 
	this.tokenStorage = tokenStorage;
  }

  ngOnInit(): void {
  }
  
	signOut(): void {
		this.tokenStorage.signOut();
	}
	
	getUser(): Profile {
		return <Profile>this.tokenStorage.getUser();
	}

}
