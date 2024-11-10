'use client';

import { useState } from 'react';
import DefaultLayout from '@/components/DefaultLayout';
import Link from 'next/link';
import Header from '@/components/Header';
import { GoToMain } from '@/components/GoToMain';
import { AuthAPI } from '@/api/authAPI';
import { createUser } from '@/types/user';

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
			await AuthAPI.login(formUser);

			// 로그인 성공 응답
			alert('로그인에 성공했습니다.');
			window.location.href = '/auth';
		} catch (err) {
			console.error('로그인 에러:', err);
			setError(err instanceof Error ? err.message : '로그인 중 오류가 발생했습니다.');
		}
	};

	return (
		<DefaultLayout>
			<Header title="ID/PW 로그인"></Header>
			<div className="flex-1">
				<form onSubmit={handleSubmit} className="space-y-2" noValidate>
					<div>
						<label htmlFor="userId" className="block mb-2">
							아이디
						</label>
						<input id="userId" type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} className="w-full p-2 border rounded" />
					</div>
					<div>
						<label htmlFor="userPw" className="block mb-2">
							비밀번호
						</label>
						<input id="userPw" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border rounded" />
					</div>
					<div className="h-8 flex items-center justify-center">{error && <div className="text-red-500 text-sm">{error}</div>}</div>
					<button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						로그인
					</button>
					<div className="text-center">
						<Link href="/auth/signup" className="text-blue-500 hover:text-blue-700 text-sm">
							회원가입
						</Link>
					</div>
				</form>
			</div>
			<GoToMain />
		</DefaultLayout>
	);
}
