import { Session } from '@/types/session';

export const ClientSessionService = {
	// 세션 저장
	setSession: (session: Session) => {
		try {
			sessionStorage.setItem('session', JSON.stringify(session));
		} catch (error) {
			console.error('세션 저장 중 오류:', error);
		}
	},

	// 세션 가져오기
	getSession: (): Session | null => {
		try {
			const session = sessionStorage.getItem('session');
			return session ? JSON.parse(session) : null;
		} catch (error) {
			console.error('세션 조회 중 오류:', error);
			return null;
		}
	},

	// 세션 제거
	removeSession: () => {
		try {
			sessionStorage.removeItem('session');
		} catch (error) {
			console.error('세션 제거 중 오류:', error);
		}
	},
};
