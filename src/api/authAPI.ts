import { errorHandler, HttpError } from '@/lib/errors/errorHandler';
import { APIError } from '@/lib/errors/server/internalError';
import { api } from './axiosAPI';
import { User } from '@/types/user';
import { ClientSessionService } from '@/services/clientSessionService';

export const AuthAPI = {
	// 회원가입 API
	signup: async (user: User) => {
		try {
			const response = await api.post('/auth/signup', user);
			const result = response.data;

			return result;
		} catch (error) {
			if (error instanceof HttpError) {
				throw errorHandler(error);
			}
			throw errorHandler(new APIError(error, '회원가입 중 오류가 발생했습니다.'));
		}
	},

	// 로그인 API
	login: async (user: User) => {
		try {
			const response = await api.post('/auth/login', user);
			const result = response.data;

			const session = result.data;
			ClientSessionService.setSession(session);

			return result;
		} catch (error) {
			if (error instanceof HttpError) {
				throw errorHandler(error);
			}
			throw errorHandler(new APIError(error, '로그인 중 오류가 발생했습니다.'));
		}
	},

	// 로그아웃 API
	logout: async () => {
		try {
			const response = await api.post('/auth/logout');
			const result = response.data;

			return result;
		} catch (error) {
			if (error instanceof HttpError) {
				throw errorHandler(error);
			}
			throw errorHandler(new APIError(error, '로그아웃 중 오류가 발생했습니다.'));
		} finally {
			ClientSessionService.removeSession();
		}
	},
};
