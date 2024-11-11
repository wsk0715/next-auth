import { ClientSessionService } from '@/services/clientSessionService';
import { User } from '@/types/user';
import { api } from './axiosAPI';
import { errorHandler, HttpError } from '@/lib/errors/errorHandler';
import { APIError } from '@/lib/errors/errors';

export const AuthAPI = {
	// 회원가입 API
	signup: async (user: User) => {
		try {
			const { data } = await api.post('/auth/signup', user);

			return data;
		} catch (error) {
			if (error instanceof HttpError) {
				throw errorHandler(error);
			}
			throw errorHandler(new APIError('회원가입 중 오류가 발생했습니다.', 500, undefined, error));
		}
	},

	// 로그인 API
	login: async (user: User) => {
		try {
			const { data } = await api.post('/auth/login', user);
			ClientSessionService.setSession(data.session);

			return data;
		} catch (error) {
			if (error instanceof HttpError) {
				throw errorHandler(error);
			}
			throw errorHandler(new APIError('로그인 중 오류가 발생했습니다.', 500, undefined, error));
		}
	},

	// 로그아웃 API
	logout: async () => {
		try {
			await api.post('/auth/logout');
		} catch (error) {
			if (error instanceof HttpError) {
				throw errorHandler(error);
			}
			throw errorHandler(new APIError('로그아웃 중 오류가 발생했습니다.', 500, undefined, error));
		} finally {
			ClientSessionService.removeSession();
		}
	},
};
