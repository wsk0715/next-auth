import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export async function POST() {
	try {
		const { error } = await supabase.auth.signOut(); // Header에 담겨 있는 Authorization 필드 사용

		if (error) {
			console.error('Logout error:', error);
			return NextResponse.json({ message: '로그아웃 처리 중 오류가 발생했습니다.' }, { status: 500 });
		}

		return NextResponse.json({ message: '로그아웃 성공' });
	} catch (error) {
		console.error('Logout error:', error);
		return NextResponse.json({ message: '로그아웃 처리 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
