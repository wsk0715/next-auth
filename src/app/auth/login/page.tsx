'use client';

import { useState } from 'react';
import DefaultLayout from '@/components/DefaultLayout';
import Link from 'next/link';
import Header from '@/components/Header';
import { GoToMain } from '@/components/GoToMain';

export default function IdPwAuthPage() {
	const [userId, setUserId] = useState('');
	const [userPw, setUserPw] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// TODO: 로그인 로직 구현
		console.log('로그인 시도:', userId, userPw);
	};

	return (
		<DefaultLayout>
			<Header title="ID/PW 로그인"></Header>
			<div className="flex-1">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="userId" className="block mb-2">
							아이디
						</label>
						<input id="userId" type="text" value={userId} onChange={(e) => setUserId(e.target.value)} className="w-full p-2 border rounded" required />
					</div>
					<div>
						<label htmlFor="userPw" className="block mb-2">
							비밀번호
						</label>
						<input id="userPw" type="password" value={userPw} onChange={(e) => setUserPw(e.target.value)} className="w-full p-2 border rounded" required />
					</div>
					<div className="h-8 flex items-center justify-center"></div>
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
