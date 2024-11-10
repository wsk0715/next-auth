import { AuthService } from '@/services/AuthService';
import { User } from '@/types/user';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const user: User = await request.json();
		const result = await AuthService.getInstance().signup(user);

		return NextResponse.json(result);
	} catch (error) {
		console.error('Signup error:', error);

		// TODO: 에러 핸들러 작성해서 클라이언트에 에러 전파

		return NextResponse.json({ message: '회원가입 처리 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
