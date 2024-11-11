'use client';

import { useState } from 'react';
import DefaultLayout from '@/components/layouts/defaultLayout';
import Header from '@/components/common/header';
import { GoToMain } from '@/components/common/goToMain';
import { AuthAPI } from '@/api/authAPI';
import { createUser } from '@/types/user';
import Container from '@/components/layouts/container';
import Form from '@/components/form/form';
import FormInputColumn from '@/components/form/formColumn';
import FormDisplayError from '@/components/form/formDisplayError';
import { HardButtonPrimary } from '@/components/common/buttons/hardButton';
import { SoftButtonPrimary } from '@/components/common/buttons/softButton';
import { HttpError } from '@/lib/errors/errorHandler';

export default function IdPwAuthPage() {
	const [formData, setFormData] = useState({
		id: '',
		password: '',
	});
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		try {
			// 로그인 API 호출 및 응답 데이터 받기
			const formUser = createUser({ id: formData.id, password: formData.password });
			const response = await AuthAPI.login(formUser);
			console.log(response);

			if (response.result.status == 200) {
				alert('로그인에 성공했습니다.');
				window.location.href = '/auth';
			} else {
				setError(response.result.message);
			}
		} catch (err) {
			if (err instanceof HttpError) {
				setError(err.message);
			} else {
				setError('로그인 중 오류가 발생했습니다.');
			}
		}
	};

	return (
		<DefaultLayout>
			<Header title="ID/PW 로그인"></Header>
			<Container>
				<Form onSubmit={handleSubmit}>
					<FormInputColumn id="id" label="아이디" type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e })} />
					<FormInputColumn id="password" label="비밀번호" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e })} />
					<FormDisplayError error={error} />
					<HardButtonPrimary text="로그인" />
					<SoftButtonPrimary href="/auth/signup" text="회원가입" />
				</Form>
			</Container>
			<GoToMain />
		</DefaultLayout>
	);
}
