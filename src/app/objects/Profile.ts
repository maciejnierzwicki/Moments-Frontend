import { ProfileDetails } from './ProfileDetails';

export interface Profile {
	
	id: number;
	username: string;
	profilePicture: string;
	profileDetails: ProfileDetails;
  verified: boolean;
	
}
