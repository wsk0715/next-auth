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
			const HttpResult = response.data;

			return HttpResult;
		} catch (error) {
			if (error instanceof HttpError) {
				throw errorHandler(error);
			}
			throw errorHandler(new APIError(error, { message: '회원가입 중 오류가 발생했습니다.', status: 500, code: 'INTERNAL_ERROR_ON_API' }));
		}
	},

	// 로그인 API
	login: async (user: User) => {
		try {
			const response = await api.post('/auth/login', user);
			const httpResult = response.data;

			if (httpResult.result.status == 200) {
				const session = httpResult.data.session;
				ClientSessionService.setSession(session);
			}

			return httpResult;
		} catch (error) {
			if (error instanceof HttpError) {
				throw errorHandler(error);
			}
			throw errorHandler(new APIError(error, { message: '로그인 중 오류가 발생했습니다.', status: 500, code: 'INTERNAL_ERROR_ON_API' }));
		}
	},

	// 로그아웃 API
	logout: async () => {
		try {
			const response = await api.post('/auth/logout');
			const HttpResult = response.data;

			return HttpResult;
		} catch (error) {
			if (error instanceof HttpError) {
				throw errorHandler(error);
			}
			throw errorHandler(new APIError(error, { message: '로그아웃 중 오류가 발생했습니다.', status: 500, code: 'INTERNAL_ERROR_ON_API' }));
		} finally {
			ClientSessionService.removeSession();
		}
	},
};
