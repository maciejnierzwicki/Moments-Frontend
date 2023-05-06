import { Profile } from '../../../objects/Profile';
import { LikeDTO } from './LikeDTO';

export class PostView {
	
	id: number;
	author: Profile;
	creationDate: Date;
	description: string = "";
	imageLocation: string;
	likesCount: number = 0;
	commentsCount: number = 0;
	
	constructor(id: number, author: Profile, creationDate: Date, description: string, imageLocation: string, likesCount: number, commentsCount: number) {
		this.id = id;
		this.author = author;
		this.creationDate = creationDate;
		this.description = description;
		this.imageLocation = imageLocation;
		this.likesCount = likesCount;
		this.commentsCount = commentsCount;
	}
	
}
