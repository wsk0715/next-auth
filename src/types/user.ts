// 기본 사용자 요청 타입
export interface UserRequest {
	id: string;
	email: string;
	password: string;
	auth_uuid: string;
}

export const createUserRequest = (id: string, email: string, password: string, auth_uuid: string): UserRequest => {
	return {
		id: id,
		email: email,
		password: password,
		auth_uuid: auth_uuid,
	};
};
