import { ClientSessionService } from '@/services/clientSessionService';
import axios from 'axios';

// 기본 API
export const api = axios.create({
	baseURL: '/api',
	headers: {
		'Content-Type': 'application/json',
	},
});

// 인터셉터 - 요청 시마다 동적으로 토큰 추가
api.interceptors.request.use((config) => {
	const session = ClientSessionService.getSession();
	if (session?.access_token) {
		config.headers.Authorization = `Bearer ${session.access_token}`;
	}
	return config;
});

// 인터셉터 - 401 에러(토큰 만료) 처리
api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (axios.isAxiosError(error) && error.response?.status === 401) {
			ClientSessionService.removeSession();
			window.location.href = '/login';
		}
		return Promise.reject(error);
	}
);
