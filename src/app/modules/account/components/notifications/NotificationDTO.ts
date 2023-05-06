import { Profile } from '../../../../objects/Profile';
import { LikeDTO } from '../../../../modules/post/objects/LikeDTO';
import { CommentDTO } from '../../../../modules/post/objects/CommentDTO';
import { PostView } from '../../../../modules/post/objects/PostView';
import { TrackingDTO } from '../../../../objects/TrackingDTO';
import { NotificationType } from './NotificationType';

export class NotificationDTO {
	
	id: number;
	user: Profile;
  sentDate: Date;
  read: Boolean;
	notificationType: NotificationType;
	post: PostView;
	like: LikeDTO;
	comment: CommentDTO;
	tracking: TrackingDTO;
	
	constructor(id: number, user: Profile, sentDate: Date, read: Boolean, notificationType: NotificationType, post: PostView, like: LikeDTO, comment: CommentDTO, tracking: TrackingDTO) {
		this.id = id;
		this.user = user;
    this.sentDate = sentDate;
    this.read = read;
		this.notificationType = notificationType;
		this.post = post;
		this.like = like;
		this.comment = comment;
		this.tracking = tracking;
	}
	
}
