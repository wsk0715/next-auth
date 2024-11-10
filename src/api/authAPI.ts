import axios from 'axios';
import { ClientSessionService } from '@/services/clientSessionService';
import { User } from '@/types/user';
import { api } from './axiosAPI';

export const AuthAPI = {
	// 회원가입 API
	signup: async (user: User) => {
		try {
			const { data } = await api.post('/auth/signup', user);
			return data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(error.response?.data?.message || '회원가입 실패');
			}
			throw error;
		}
	},

	// 로그인 API
	login: async (user: User) => {
		try {
			const { data } = await api.post('/auth/login', user);
			if (data.session) {
				data.session.user.id = user.id;
				ClientSessionService.setSession(data.session);
			}
			return data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				throw new Error(error.response?.data?.message || '로그인 실패');
			}
			throw error;
		}
	},

	// 로그아웃 API
	logout: async () => {
		try {
			await api.post('/auth/logout');
		} finally {
			ClientSessionService.removeSession();
		}
	},
};
