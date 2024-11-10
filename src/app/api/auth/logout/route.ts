import { AuthService } from '@/services/AuthService';
import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const result = await AuthService.getInstance().logout();

		return NextResponse.json(result);
	} catch (error) {
		console.error('Logout error:', error);

		// TODO: 에러 핸들러 작성해서 클라이언트에 에러 전파

		return NextResponse.json({ message: '로그아웃 처리 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
