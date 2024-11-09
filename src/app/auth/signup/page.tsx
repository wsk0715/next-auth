'use client';

import { useState } from 'react';
import Link from 'next/link';
import DefaultLayout from '@/components/DefaultLayout';
import Header from '@/components/Header';
import { GoToMain } from '@/components/GoToMain';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabaseClient';

export default function SignUpPage() {
	const [formData, setFormData] = useState({
		id: '',
		password: '',
		passwordConfirm: '',
	});
	const [error, setError] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');

		if (formData.password !== formData.passwordConfirm) {
			setError('비밀번호가 일치하지 않습니다.');
			return;
		}

		try {
			// id 중복 체크
			const { data: existingUser } = await supabase.from('tb_user').select('user_id').eq('user_id', formData.id).single();

			if (existingUser) {
				setError('이미 사용 중인 아이디입니다.');
				return;
			}

			// pw 암호화
			const hashedPassword = await bcrypt.hash(formData.password, 10);

			// 회원가입 처리
			const { error: insertError } = await supabase.from('tb_user').insert([
				{
					user_id: formData.id,
					user_pw: hashedPassword,
				},
			]);

			if (insertError) throw insertError;

			alert('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
			window.location.href = '/auth/login';
		} catch (err) {
			console.error('회원가입 에러:', err);
			setError('회원가입 중 오류가 발생했습니다.');
		}
	};

	return (
		<DefaultLayout>
			<Header title="회원가입"></Header>
			<div className="flex-1">
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label htmlFor="id" className="block mb-2">
							아이디
						</label>
						<input id="id" type="text" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} className="w-full p-2 border rounded" required />
					</div>
					<div>
						<label htmlFor="password" className="block mb-2">
							비밀번호
						</label>
						<input id="password" type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full p-2 border rounded" required />
					</div>
					<div>
						<label htmlFor="confirmPassword" className="block mb-2">
							비밀번호 확인
						</label>
						<input id="confirmPassword" type="password" value={formData.passwordConfirm} onChange={(e) => setFormData({ ...formData, passwordConfirm: e.target.value })} className="w-full p-2 border rounded" required />
					</div>
					<div className="h-8 flex items-center justify-center">{error && <div className="text-red-500 text-sm">{error}</div>}</div>
					<button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						회원가입
					</button>
					<div className="text-center">
						<Link href="/auth/login" className="text-blue-500 hover:text-blue-700 text-sm">
							이미 계정이 있으신가요? 로그인하기
						</Link>
					</div>
				</form>
			</div>
			<GoToMain />
		</DefaultLayout>
	);
}
