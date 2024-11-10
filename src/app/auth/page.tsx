'use client';

import { useEffect, useState } from 'react';
import DefaultLayout from '@/components/DefaultLayout';
import { GoToMain } from '@/components/GoToMain';
import Header from '@/components/Header';
import Link from 'next/link';
import { AuthAPI } from '@/api/authAPI';

interface UserInfo {
	id: string;
	email: string;
}

export default function AuthPage() {
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const session = sessionStorage.getItem('session');
		if (session) {
			try {
				const parsedSession = JSON.parse(session);
				const user = parsedSession.user;
				if (user) {
					setUserInfo({
						id: user.id,
						email: user.email,
					});
				}
			} catch (error) {
				console.error('세션 정보 파싱 에러:', error);
			}
		}
		setIsLoading(false);
	}, []);

	return (
		<DefaultLayout>
			<Header title="ID/PW 인증"></Header>
			<div className="flex-1">
				<div className="flex flex-col items-center justify-center gap-2 px-4 py-2">[사용자 정보]</div>
				<div className="flex flex-col items-center justify-center gap-2 px-4 py-2 min-h-[120px]">
					{isLoading ? (
						'로딩 중...'
					) : userInfo ? (
						userInfo.id ? (
							<>
								<p>id: {userInfo.id}</p>
								<p>email: {userInfo.email}</p>
								<button
									onClick={async () => {
										try {
											await AuthAPI.logout();
											window.location.href = '/auth';
										} catch (error) {
											console.error('로그아웃 에러:', error);
										}
									}}
									className="text-red-500 hover:text-red-700 text-sm mt-2">
									로그아웃
								</button>
							</>
						) : (
							''
						)
					) : (
						'로그아웃 상태입니다.'
					)}
				</div>
				<div className="flex flex-col items-center justify-center gap-2 px-4 py-5">
					<Link href="/auth/login" className="text-blue-500 hover:text-blue-700">
						로그인 페이지로 이동
					</Link>
					<Link href="/auth/signup" className="text-blue-500 hover:text-blue-700">
						회원가입 페이지로 이동
					</Link>
				</div>
			</div>
			<GoToMain />
		</DefaultLayout>
	);
}
