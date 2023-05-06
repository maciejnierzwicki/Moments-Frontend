import { Profile } from './Profile';

export class TrackingDTO {
	
	id: number;
	user: Profile;
	followed: Profile;
	sentDate: Date;
	
	constructor(id: number, user: Profile, followed: Profile, sentDate: Date) {
		this.id = id;
		this.user = user;
		this.followed = followed;
		this.sentDate = sentDate;
	}
	
}