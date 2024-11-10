// User 타입
export interface User {
	id: string;
	email?: string;
	password?: string;
	auth_uuid?: string;
	passwordConfirm?: string;
}

// User 타입 생성 함수
export function createUser({ id, email, password, auth_uuid, passwordConfirm }: { id: string; email?: string; password?: string; auth_uuid?: string; passwordConfirm?: string }): User {
	return {
		id,
		...(email && { email }),
		...(password && { password }),
		...(auth_uuid && { auth_uuid }),
		...(passwordConfirm && { passwordConfirm }),
	};
}
