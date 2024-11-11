'use client';

import { useState } from 'react';
import DefaultLayout from '@/components/layouts/defaultLayout';
import Header from '@/components/common/header';
import { AuthAPI } from '@/api/authAPI';
import { validateUserSignup } from '@/validation/userValidator';
import { createUser } from '@/types/user';
import Container from '@/components/layouts/container';
import Form from '@/components/form/form';
import FormDisplayError from '@/components/form/formDisplayError';
import FormInputColumn from '@/components/form/formColumn';
import { HardButtonPrimary } from '@/components/common/buttons/hardButton';
import { SoftButtonPrimary } from '@/components/common/buttons/softButton';
import { GoToMain } from '@/components/common/goToMain';

export default function SignUpPage() {
	const [formData, setFormData] = useState({
		id: '',
		email: '',
		password: '',
		passwordConfirm: '',
	});
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		// 클라이언트 측 유효성 검사
		const formUser = createUser({ id: formData.id, password: formData.password, email: formData.email });
		const validationError = validateUserSignup(formUser, formData.passwordConfirm);

		if (validationError) {
			setError(validationError);
			return;
		}

		try {
			// 회원가입 API 호출
			const response = await AuthAPI.signup(formUser);

			if (response.result.status === 200) {
				alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
				window.location.href = '/auth/login';
			} else {
				setError(response.result.message);
			}
		} catch (err) {
			console.error('회원가입 에러:', err);
			setError(err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다.');
		}
	};

	return (
		<DefaultLayout>
			<Header title="회원가입"></Header>
			<Container>
				<Form onSubmit={handleSubmit}>
					<FormInputColumn id="id" label="아이디" type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e })} />
					<FormInputColumn id="email" label="이메일" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e })} />
					<FormInputColumn id="password" label="비밀번호" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e })} />
					<FormInputColumn id="confirmPassword" label="비밀번호 확인" type="password" value={formData.passwordConfirm} onChange={(e) => setFormData({ ...formData, passwordConfirm: e })} />
					<FormDisplayError error={error} />
					<HardButtonPrimary text="회원가입" />
					<SoftButtonPrimary href="/auth/login" text="이미 계정이 있으신가요? 로그인하기" />
				</Form>
			</Container>
			<GoToMain />
		</DefaultLayout>
	);
}
