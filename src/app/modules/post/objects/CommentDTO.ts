import { Profile } from '../../../objects/Profile';
import { PostView } from './PostView';

export class CommentDTO {
	
	id: number;
	user: Profile;
	sentDate: Date;
	message: string;
	
	constructor(id: number, user: Profile, sentDate: Date, message: string) {
		this.id = id;
		this.user = user;
		this.sentDate = sentDate;
		this.message = message;
	}
	
}