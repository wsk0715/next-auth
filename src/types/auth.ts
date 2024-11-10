// 기본 인증 요청 타입
export interface AuthRequest {
	email: string;
	password: string;
}

export const createAuthRequest = (email: string, password: string): AuthRequest => {
	return {
		email: email,
		password: password,
	};
};

export interface AuthResponse {
	message: string;
}
