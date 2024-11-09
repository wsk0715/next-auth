'use client';

import DefaultLayout from '@/components/DefaultLayout';
import { useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import bcryptjs from 'bcryptjs';
import Header from '@/components/Header';

export default function SupabasePage() {
	// Supabase 클라이언트 생성
	const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

	useEffect(() => {
		// Supabase 연결 테스트
		const testSupabase = async () => {
			try {
				const { count, error } = await supabase.from('test_user').select('*', { count: 'exact' });
				if (error) throw error;
				alert(`Supabase 연결 성공!\n조회된 데이터: ${count}개`);
			} catch (error) {
				console.error('Supabase 연결 에러:', error);
				alert('Supabase 연결 실패!' + error);
			}
		};

		testSupabase();
	}, []);

	// 테스트 유저 생성
	const insertTestUser = async () => {
		try {
			const hashedPassword = await bcryptjs.hash('testuser', 10); // 비밀번호 해싱, pw: testuser

			const { error } = await supabase.from('test_user').insert([
				{
					user_id: 'testuser',
					user_pw: hashedPassword,
				},
			]);

			if (error) throw error;
			alert('테스트 유저 생성 성공!');
		} catch (error) {
			console.error('유저 생성 에러:', error);
			alert('테스트 유저 생성 실패!');
		}
	};

	// 테스트 유저 삭제
	const deleteTestUser = async () => {
		try {
			const { error } = await supabase.from('test_user').delete().eq('user_id', 'testuser');

			if (error) throw error;
			alert('테스트 유저 삭제 성공!');
		} catch (error) {
			console.error('유저 삭제 에러:', error);
			alert('테스트 유저 삭제 실패!');
		}
	};

	return (
		<DefaultLayout>
			<Header title="Supabase 연결 페이지" />
			<div className="flex-1">
				<div className="h-fit flex justify-center items-center gap-4 px-4 py-5">
					<button onClick={insertTestUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						테스트 유저 생성
					</button>
					<button onClick={deleteTestUser} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
						테스트 유저 삭제
					</button>
				</div>
			</div>
		</DefaultLayout>
	);
}
