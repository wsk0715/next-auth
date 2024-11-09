'use client';

import { useState } from 'react';
import Link from 'next/link';
import DefaultLayout from '@/components/DefaultLayout';
import Header from '@/components/Header';
import { GoToMain } from '@/components/GoToMain';

export default function SignUpPage() {
	const [formData, setFormData] = useState({
		id: '',
		password: '',
		passwordConfirm: '',
	});
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (formData.password !== formData.passwordConfirm) {
			setError('비밀번호가 일치하지 않습니다.');
			return;
		}

		// TODO: 회원가입 로직 구현
		console.log('회원가입 시도:', formData);
	};

	return (
		<DefaultLayout>
			<Header title="회원가입"></Header>
			<div className="flex-1">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="id" className="block mb-2">
							아이디
						</label>
						<input id="id" type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} className="w-full p-2 border rounded" required />
					</div>
					<div>
						<label htmlFor="password" className="block mb-2">
							비밀번호
						</label>
						<input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border rounded" required />
					</div>
					<div>
						<label htmlFor="confirmPassword" className="block mb-2">
							비밀번호 확인
						</label>
						<input id="confirmPassword" type="password" value={formData.passwordConfirm} onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })} className="w-full p-2 border rounded" required />
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
