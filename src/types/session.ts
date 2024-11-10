import { User } from '@/types/user';

export interface Session {
	access_token: string;
	expires_at?: number;
	expires_in?: number;
	refresh_token: string;
	token_type: string;
	user: User;
}
