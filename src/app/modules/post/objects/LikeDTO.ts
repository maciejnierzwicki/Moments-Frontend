import { Profile } from '../../../objects/Profile';
import { PostView } from './PostView';

export class LikeDTO {
	
	id: number;
	user: Profile;
	sentDate: Date;
	
	constructor(id: number, user: Profile, sentDate: Date) {
		this.id = id;
		this.user = user;
		this.sentDate = sentDate;
	}
	
}