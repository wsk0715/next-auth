import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createAuthRequest } from '@/types/auth';

export async function POST(request: Request) {
	try {
		const { id, password } = await request.json();

		// DB에서 사용자 조회
		const { data: user, error: fetchError } = await supabase.from('tb_user').select('*').eq('id', id).single();

		if (fetchError || !user) {
			console.error('User fetch error:', fetchError);
			return NextResponse.json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
		}

		// 비밀번호 확인
		const isValidPassword = await bcrypt.compare(password, user.password);
		if (!isValidPassword) {
			return NextResponse.json({ message: '아이디 또는 비밀번호가 일치하지 않습니다.' }, { status: 401 });
		}

		// Supabase Auth 로그인
		const { data: authData, error: authError } = await supabase.auth.signInWithPassword(createAuthRequest(user.email, password));

		if (authError) {
			console.error('Auth error:', authError);
			throw authError;
		}

		return NextResponse.json({
			message: '로그인 성공',
			user: {
				id: user.id,
				email: user.email,
			},
			session: authData.session,
		});
	} catch (error) {
		console.error('Login error:', error);
		return NextResponse.json({ message: '로그인 처리 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
