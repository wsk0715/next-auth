import { User } from '@/types/user';

export function validateUserSignup(user: User, passwordConfirm: string) {
	const { id, password, email } = user;
	const MIN_LENGTH_ID = 4;
	const MIN_LENGTH_PASSWORD = 8;

	// 입력여부 검사
	if (!id || !email || !password || !passwordConfirm) {
		return '모든 입력란을 채워주세요.';
	}

	// ID 길이 검사
	if (id.length < MIN_LENGTH_ID) {
		return `아이디는 ${MIN_LENGTH_ID}자 이상이어야 합니다.`;
	}

	// 이메일 형식 검사
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		return '올바른 이메일 형식이 아닙니다.';
	}

	// 비밀번호 길이 검사
	if (password.length < MIN_LENGTH_PASSWORD) {
		return `비밀번호는 ${MIN_LENGTH_PASSWORD}자 이상이어야 합니다.`;
	}

	// 비밀번호 일치 여부 검사
	if (password !== passwordConfirm) {
		return '비밀번호가 일치하지 않습니다.';
	}
}
