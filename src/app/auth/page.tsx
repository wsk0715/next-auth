'use client';

import DefaultLayout from '@/components/DefaultLayout';
import { GoToMain } from '@/components/GoToMain';
import Header from '@/components/Header';
import Link from 'next/link';

export default function AuthPage() {
	return (
		<DefaultLayout>
			<Header title="ID/PW 인증"></Header>
			<div className="flex-1">
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
