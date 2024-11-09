import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
	try {
		// 요청 데이터 받기
		const { id, email, password } = await request.json();

		// id 중복 체크
		const { data: existingUser } = await supabase.from('tb_user').select('user_id').eq('user_id', id).single();

		if (existingUser) {
			return NextResponse.json({ message: '이미 사용 중인 아이디입니다.' }, { status: 400 });
		}

		// 이메일 중복 체크
		const { data: existingEmail } = await supabase.from('tb_user').select('user_email').eq('user_email', email).single();

		if (existingEmail) {
			return NextResponse.json({ message: '이미 사용 중인 이메일입니다.' }, { status: 400 });
		}

		// 비밀번호 암호화
		const hashedPassword = await bcrypt.hash(password, 10);

		// 회원가입 처리
		const { error: insertError } = await supabase.from('tb_user').insert([
			{
				user_id: id,
				user_email: email,
				user_pw: hashedPassword,
			},
		]);

		if (insertError) throw insertError;

		// 회원가입 성공 응답
		return NextResponse.json({ message: '회원가입이 완료되었습니다.' });
	} catch (error) {
		console.error('회원가입 에러:', error);
		return NextResponse.json({ message: '회원가입 처리 중 오류가 발생했습니다.' }, { status: 500 });
	}
}
