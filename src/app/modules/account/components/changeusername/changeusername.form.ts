import { Profile } from '../../../../objects/Profile';

export class ChangeUsernameForm {
	username: string = '';
	
	
	apply(user: Profile): void {
		this.username = user.username;
	}

}