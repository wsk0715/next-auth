'use client';

import { useState } from 'react';
import Link from 'next/link';
import DefaultLayout from '@/components/DefaultLayout';
import Header from '@/components/Header';
import { GoToMain } from '@/components/GoToMain';
import { AuthAPI } from '@/api/authAPI';

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
		if (formData.password !== formData.passwordConfirm) {
			setError('비밀번호가 일치하지 않습니다.');
			return;
		}

		if (formData.password.length < 8) {
			setError('비밀번호는 8자 이상이어야 합니다.');
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(formData.email)) {
			setError('올바른 이메일 형식이 아닙니다.');
			return;
		}

		try {
			// 회원가입 API 호출
			await AuthAPI.signup({
				userId: formData.id,
				userEmail: formData.email,
				userPw: formData.password,
			});

			// 회원가입 성공 응답
			alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
			window.location.href = '/auth/login';
		} catch (err) {
			console.error('회원가입 에러:', err);
			setError(err instanceof Error ? err.message : '회원가입 중 오류가 발생했습니다.');
		}
	};

	return (
		<DefaultLayout>
			<Header title="회원가입"></Header>
			<div className="flex-1">
				<form onSubmit={handleSubmit} className="space-y-2" noValidate>
					<div>
						<label htmlFor="id" className="block mb-2">
							아이디
						</label>
						<input id="id" type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} className="w-full p-2 border rounded" />
					</div>
					<div>
						<label htmlFor="email" className="block mb-2">
							이메일
						</label>
						<input id="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2 border rounded" />
					</div>
					<div>
						<label htmlFor="password" className="block mb-2">
							비밀번호
						</label>
						<input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border rounded" />
					</div>
					<div>
						<label htmlFor="confirmPassword" className="block mb-2">
							비밀번호 확인
						</label>
						<input id="confirmPassword" type="password" value={formData.passwordConfirm} onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })} className="w-full p-2 border rounded" />
					</div>
					<div className="h-8 flex items-center justify-center">{error && <div className="text-red-500 text-sm">{error}</div>}</div>
					<button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						회원가입
					</button>
					<div className="text-center">
						<Link href="/auth/login" className="text-blue-500 hover:text-blue-700 text-sm">
							이미 계정이 있으신가요? 로그인하기
						</Link>
					</div>
				</form>
			</div>
			<GoToMain />
		</DefaultLayout>
	);
}
