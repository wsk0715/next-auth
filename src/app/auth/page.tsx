'use client';

import { useEffect, useState } from 'react';
import DefaultLayout from '@/components/layouts/defaultLayout';
import { GoToMain } from '@/components/common/goToMain';
import Header from '@/components/common/header';
import { AuthAPI } from '@/api/authAPI';
import { User } from '@/types/user';
import Container from '@/components/layouts/container';
import Column from '@/components/layouts/column';
import { SoftButtonPrimary } from '@/components/common/buttons/softButton';
import { SoftButtonWarning } from '@/components/common/buttons/softButton';

export default function AuthPage() {
	const [userInfo, setUserInfo] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [session, setSession] = useState(false);

	useEffect(() => {
		const session = sessionStorage.getItem('session');
		const sessionData = session ? JSON.parse(session) : null;

		if (sessionData && sessionData.user) {
			try {
				const user = sessionData.user;

				setUserInfo(user);
				setSession(true);
			} catch (error) {
				console.error('세션 정보 파싱 에러:', error);
			}
		}
		setIsLoading(false);
	}, []);

	const renderUserInfo = () => {
		if (isLoading) return <Column minHeight="120px">로딩 중...</Column>;
		if (!userInfo) return <Column minHeight="120px">로그아웃 상태입니다.</Column>;

		return (
			<div className="flex flex-col items-center justify-center gap-2 px-4 py-2 min-h-[120px]">
				<p>id: {userInfo.id}</p>
				<p>email: {userInfo.email}</p>
				<SoftButtonWarning
					onClick={async () => {
						try {
							await AuthAPI.logout();
							window.location.href = '/auth';
						} catch (error) {
							console.error('로그아웃 에러:', error);
						}
					}}
					text="로그아웃"
				/>
			</div>
		);
	};

	const renderAuthLinks = () => {
		if (session) {
			return <SoftButtonPrimary href="/auth/mypage" text="회원정보 관리" />;
		}

		return (
			<>
				<SoftButtonPrimary href="/auth/login" text="로그인 페이지로 이동" />
				<SoftButtonPrimary href="/auth/signup" text="회원가입 페이지로 이동" />
			</>
		);
	};

	return (
		<DefaultLayout>
			<Header title="ID/PW 인증"></Header>
			<Container>
				<Column>사용자 정보</Column>
				<div>{renderUserInfo()}</div>
				<Column>{renderAuthLinks()}</Column>
			</Container>
			<GoToMain />
		</DefaultLayout>
	);
}
