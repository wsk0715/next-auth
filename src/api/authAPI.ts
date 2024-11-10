interface UserCredentials {
	id: string;
	email: string;
	password: string;
}

export const AuthAPI = {
	signup: async (credentials: UserCredentials) => {
		// 회원가입 API 호출
		const response = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
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
};
