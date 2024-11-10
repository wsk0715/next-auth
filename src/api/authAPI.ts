import { ClientSessionService } from '@/services/clientSessionService';
import { User } from '@/types/user';

export const AuthAPI = {
	signup: async (user: User) => {
		// 회원가입 API 호출
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		// 응답 데이터 받기
		const data = await response.json();

		// 응답 상태 확인
		if (!response.ok) {
			throw new Error(data.message);
		}

		// 응답 데이터 반환
		return data;
	},

	login: async (user: User) => {
		// 로그인 API 호출
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		// 응답 데이터 받기
		const data = await response.json();

		// 응답 상태 확인
		if (!response.ok) {
			throw new Error(data.message);
		}

		// 세션 저장
		if (data.session) {
			ClientSessionService.setSession({
				access_token: data.session.access_token,
				refresh_token: data.session.refresh_token,
				user: data.user,
			});
		}

		// 응답 데이터 반환
		return data;
	},

	getSession: () => {
		// 세션 조회
		return ClientSessionService.getSession();
	},

	logout: async () => {
		try {
			// 로그아웃 API 호출
			await fetch('/api/auth/logout', {
				method: 'POST',
			});
		} finally {
			// API 호출 결과와 관계없이 클라이언트 세션은 항상 제거
			ClientSessionService.removeSession();
		}
	},
};
