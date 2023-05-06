import { Profile } from './Profile';

export interface JwtResponse {
	
	user: Profile;
	refreshToken: string;
}