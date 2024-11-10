import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAuthRequest } from '@/types/auth';
import { createUserRequest } from '@/types/user';

export async function POST(request: Request) {
	try {
		// 요청 데이터 받기
		const { id, email, password } = await request.json();

		// Supabase Auth에 사용자 등록
		const { data: authData, error: authError } = await supabase.auth.signUp(createAuthRequest(email, password));

		// Supabase Auth 에러 처리
		if (authError) throw authError;
		if (!authData.user) throw new Error('인증 정보 생성에 실패하였습니다.');

		// DB에 사용자 정보 저장
		const hashedPassword = await bcrypt.hash(password, 10);
		const userData = createUserRequest(id, email, hashedPassword, authData.user.id);
		const { error: dbError } = await supabase.from('tb_user').insert([userData]);

		// DB 에러 처리
		if (dbError) {
			// DB 저장 실패 시 Auth 롤백
			await supabase.auth.admin.deleteUser(authData.user.id);
			throw dbError;
		}

		// 회원가입 성공 응답
		return NextResponse.json({ message: '회원가입이 완료되었습니다.' });
	} catch (error) {
		console.error('회원가입 에러:', error);
		return NextResponse.json({ message: '회원가입 처리 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
