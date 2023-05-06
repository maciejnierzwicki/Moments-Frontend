import { Profile } from '../../../../objects/Profile';

export class ChangeEmailForm {
	email: string = '';
	
	
	apply(user: Profile): void {
		this.email = user.profileDetails.email;
	}

}